const debug = require('ghost-ignition').debug('web:api:default:app');
const express = require('../../../shared/express');
const urlUtils = require('../../../shared/url-utils');
const errorHandler = require('../shared/middlewares/error-handler');

module.exports = function setupApiApp() {
    debug('Parent API setup start');
    const apiApp = express('api');

    // Mount different API versions
    apiApp.use(urlUtils.getVersionPath({version: 'v2', type: 'content'}), require('./v2/content/app')());
    apiApp.use(urlUtils.getVersionPath({version: 'v2', type: 'admin'}), require('./v2/admin/app')());

    apiApp.use(urlUtils.getVersionPath({version: 'v3', type: 'content'}), require('./canary/content/app')());
    apiApp.use(urlUtils.getVersionPath({version: 'v3', type: 'admin'}), require('./canary/admin/app')());

    apiApp.use(urlUtils.getVersionPath({version: 'canary', type: 'content'}), require('./canary/content/app')());
    apiApp.use(urlUtils.getVersionPath({version: 'canary', type: 'admin'}), require('./canary/admin/app')());

    // Error handling for requests to non-existent API versions
    apiApp.use(errorHandler.resourceNotFound);
    apiApp.use(errorHandler.handleJSONResponse);

    debug('Parent API setup end');
    return apiApp;
};
