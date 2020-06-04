const MembersSSR = require('@tryghost/members-ssr');

const MembersConfigProvider = require('./config');
const createMembersApiInstance = require('./api');
const {events} = require('../../lib/common');
const logging = require('../../../shared/logging');
const urlUtils = require('../../../shared/url-utils');
const settingsCache = require('../settings/cache');
const config = require('../../../shared/config');
const ghostVersion = require('../../lib/ghost-version');

const membersConfig = new MembersConfigProvider({
    config,
    settingsCache,
    urlUtils,
    logging,
    ghostVersion
});

let membersApi;

// Bind to events to automatically keep subscription info up-to-date from settings
events.on('settings.edited', function updateSettingFromModel(settingModel) {
    if (!['members_subscription_settings'].includes(settingModel.get('key'))) {
        return;
    }

    const reconfiguredMembersAPI = createMembersApiInstance(membersConfig);
    reconfiguredMembersAPI.bus.on('ready', function () {
        membersApi = reconfiguredMembersAPI;
    });
    reconfiguredMembersAPI.bus.on('error', function (err) {
        logging.error(err);
    });
});

const membersService = {
    contentGating: require('./content-gating'),

    config: membersConfig,

    get api() {
        if (!membersApi) {
            membersApi = createMembersApiInstance(membersConfig);

            membersApi.bus.on('error', function (err) {
                logging.error(err);
            });
        }
        return membersApi;
    },

    ssr: MembersSSR({
        cookieSecure: urlUtils.isSSL(urlUtils.getSiteUrl()),
        cookieKeys: [settingsCache.get('theme_session_secret')],
        cookieName: 'ghost-members-ssr',
        cookieCacheName: 'ghost-members-ssr-cache',
        getMembersApi: () => membersService.api
    }),

    stripeConnect: require('./stripe-connect')
};

module.exports = membersService;
module.exports.middleware = require('./middleware');
