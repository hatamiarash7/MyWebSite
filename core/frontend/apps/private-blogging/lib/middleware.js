const fs = require('fs-extra');
const url = require('url');
const session = require('cookie-session');
const crypto = require('crypto');
const path = require('path');
const config = require('../../../../shared/config');
const urlUtils = require('../../../../shared/url-utils');
const constants = require('../../../../server/lib/constants');
const {i18n} = require('../../../../server/lib/common');
const errors = require('@tryghost/errors');
const settingsCache = require('../../../../server/services/settings/cache');
// routeKeywords.private: 'private'
const privateRoute = '/private/';

function verifySessionHash(salt, hash) {
    if (!salt || !hash) {
        return false;
    }

    let hasher = crypto.createHash('sha256');
    hasher.update(settingsCache.get('password') + salt, 'utf8');
    return hasher.digest('hex') === hash;
}

function getRedirectUrl(query) {
    try {
        const redirect = decodeURIComponent(query.r || '/');
        return url.parse(redirect).pathname;
    } catch (e) {
        return '/';
    }
}

const privateBlogging = {
    checkIsPrivate: function checkIsPrivate(req, res, next) {
        let isPrivateBlog = settingsCache.get('is_private');

        if (!isPrivateBlog) {
            res.isPrivateBlog = false;
            return next();
        }

        res.isPrivateBlog = true;

        return session({
            maxAge: constants.ONE_MONTH_MS,
            signed: false,
            sameSite: 'none'
        })(req, res, next);
    },

    filterPrivateRoutes: function filterPrivateRoutes(req, res, next) {
        // If this site is not in private mode, skip
        if (!res.isPrivateBlog) {
            return next();
        }

        // CASE: this is the /private/ page, continue (allow this to be rendered)
        if (req.path === `${privateRoute}`) {
            return next();
        }

        // CASE: this is the robots.txt file, serve a special private version
        if (req.path === '/robots.txt') {
            return fs.readFile(path.resolve(__dirname, '../', 'robots.txt'), function readFile(err, buf) {
                if (err) {
                    return next(err);
                }

                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Content-Length': buf.length,
                    'Cache-Control': 'public, max-age=' + config.get('caching:robotstxt:maxAge')
                });

                res.end(buf);
            });
        }

        // CASE: Allow private RSS feed urls.
        // If the path matches the private rss feed URL we rewrite the url. Even Express uses rewriting when using `app.use()`.
        let isPrivateRSS = new RegExp(`/${settingsCache.get('public_hash')}/rss(/)?$`);
        if (isPrivateRSS.test(req.path)) {
            req.url = req.url.replace(settingsCache.get('public_hash') + '/', '');
            return next();
        }

        // NOTE: Redirect to /private if the session does not exist.
        privateBlogging.authenticatePrivateSession(req, res, function onSessionVerified() {
            // CASE: RSS is disabled for private blogging e.g. they create overhead
            if (req.path.match(/\/rss\/$/)) {
                return next(new errors.NotFoundError({
                    message: i18n.t('errors.errors.pageNotFound')
                }));
            }

            next();
        });
    },

    authenticatePrivateSession: function authenticatePrivateSession(req, res, next) {
        const hash = req.session.token || '';
        const salt = req.session.salt || '';
        const isVerified = verifySessionHash(salt, hash);

        if (isVerified) {
            return next();
        } else {
            let redirectUrl = urlUtils.urlFor({relativeUrl: privateRoute});
            redirectUrl += '?r=' + encodeURIComponent(req.url);

            return res.redirect(redirectUrl);
        }
    },

    // This is here so a call to /private/ after a session is verified will redirect to home;
    redirectPrivateToHomeIfLoggedIn: function redirectPrivateToHomeIfLoggedIn(req, res, next) {
        if (!res.isPrivateBlog) {
            return res.redirect(urlUtils.urlFor('home', true));
        }

        const hash = req.session.token || '';
        const salt = req.session.salt || '';
        const isVerified = verifySessionHash(salt, hash);

        if (isVerified) {
            // redirect to home if user is already authenticated
            return res.redirect(urlUtils.urlFor('home', true));
        } else {
            return next();
        }
    },

    doLoginToPrivateSite: function doLoginToPrivateSite(req, res, next) {
        // if errors have been generated from the previous call
        if (res.error) {
            return next();
        }

        const bodyPass = req.body.password;
        const pass = settingsCache.get('password');
        const hasher = crypto.createHash('sha256');
        const salt = Date.now().toString();
        const forward = getRedirectUrl(req.query);

        if (pass === bodyPass) {
            hasher.update(bodyPass + salt, 'utf8');
            req.session.token = hasher.digest('hex');
            req.session.salt = salt;

            return res.redirect(urlUtils.urlFor({relativeUrl: forward}));
        } else {
            res.error = {
                message: i18n.t('errors.middleware.privateblogging.wrongPassword')
            };
            return next();
        }
    },

    /**
     * We should never render a 404 error for private sites, as these can leak information
     */
    handle404: function handle404(err, req, res, next) {
        // CASE: not a private site, skip to next handler
        if (!res.isPrivateBlog) {
            return next(err);
        }

        // CASE: not a private 404, something else went wrong, show an error
        if (err.statusCode !== 404) {
            return next(err);
        }

        // CASE: 404 - redirect this page back to /private/ if the user isn't verified
        return privateBlogging.authenticatePrivateSession(req, res, function onSessionVerified() {
            // CASE: User is logged in, render an error
            return next(err);
        });
    }
};

module.exports = privateBlogging;
