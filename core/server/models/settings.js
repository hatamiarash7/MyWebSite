const Promise = require('bluebird');
const _ = require('lodash');
const uuid = require('uuid');
const crypto = require('crypto');
const keypair = require('keypair');
const ObjectID = require('bson-objectid');
const ghostBookshelf = require('./base');
const {i18n} = require('../lib/common');
const errors = require('@tryghost/errors');
const validation = require('../data/validation');
const settingsCache = require('../services/settings/cache');
const internalContext = {context: {internal: true}};
let Settings;
let defaultSettings;

const doBlock = fn => fn();

const getMembersKey = doBlock(() => {
    let UNO_KEYPAIRINO;
    return function getMembersKey(type) {
        if (!UNO_KEYPAIRINO) {
            UNO_KEYPAIRINO = keypair({bits: 1024});
        }
        return UNO_KEYPAIRINO[type];
    };
});

const getGhostKey = doBlock(() => {
    let UNO_KEYPAIRINO;
    return function getGhostKey(type) {
        if (!UNO_KEYPAIRINO) {
            UNO_KEYPAIRINO = keypair({bits: 1024});
        }
        return UNO_KEYPAIRINO[type];
    };
});

// For neatness, the defaults file is split into categories.
// It's much easier for us to work with it as a single level
// instead of iterating those categories every time
function parseDefaultSettings() {
    const defaultSettingsInCategories = require('../data/schema/').defaultSettings;
    const defaultSettingsFlattened = {};

    const dynamicDefault = {
        db_hash: () => uuid.v4(),
        public_hash: () => crypto.randomBytes(15).toString('hex'),
        // @TODO: session_secret would ideally be named "admin_session_secret"
        session_secret: () => crypto.randomBytes(32).toString('hex'),
        theme_session_secret: () => crypto.randomBytes(32).toString('hex'),
        members_public_key: () => getMembersKey('public'),
        members_private_key: () => getMembersKey('private'),
        members_email_auth_secret: () => crypto.randomBytes(64).toString('hex'),
        ghost_public_key: () => getGhostKey('public'),
        ghost_private_key: () => getGhostKey('private')
    };

    _.each(defaultSettingsInCategories, function each(settings, categoryName) {
        _.each(settings, function eachSetting(setting, settingName) {
            setting.group = categoryName;
            setting.key = settingName;

            setting.getDefaultValue = function getDefaultValue() {
                const getDynamicDefault = dynamicDefault[setting.key];
                if (getDynamicDefault) {
                    return getDynamicDefault();
                } else {
                    return setting.defaultValue;
                }
            };

            defaultSettingsFlattened[settingName] = setting;
        });
    });

    return defaultSettingsFlattened;
}

function getDefaultSettings() {
    if (!defaultSettings) {
        defaultSettings = parseDefaultSettings();
    }

    return defaultSettings;
}

// Each setting is saved as a separate row in the database,
// but the overlying API treats them as a single key:value mapping
Settings = ghostBookshelf.Model.extend({

    tableName: 'settings',

    defaults: function defaults() {
        return {
            type: 'core'
        };
    },

    emitChange: function emitChange(event, options) {
        const eventToTrigger = 'settings' + '.' + event;
        ghostBookshelf.Model.prototype.emitChange.bind(this)(this, eventToTrigger, options);
    },

    onDestroyed: function onDestroyed(model, options) {
        ghostBookshelf.Model.prototype.onDestroyed.apply(this, arguments);

        model.emitChange('deleted', options);
        model.emitChange(model._previousAttributes.key + '.' + 'deleted', options);
    },

    onCreated: function onCreated(model, response, options) {
        ghostBookshelf.Model.prototype.onCreated.apply(this, arguments);

        model.emitChange('added', options);
        model.emitChange(model.attributes.key + '.' + 'added', options);
    },

    onUpdated: function onUpdated(model, response, options) {
        ghostBookshelf.Model.prototype.onUpdated.apply(this, arguments);

        model.emitChange('edited', options);
        model.emitChange(model.attributes.key + '.' + 'edited', options);
    },

    async onValidate(model, attr, options) {
        await ghostBookshelf.Model.prototype.onValidate.call(this, model, attr, options);
        await validation.validateSettings(getDefaultSettings(), model);
    },

    format() {
        const attrs = ghostBookshelf.Model.prototype.format.apply(this, arguments);
        const settingType = attrs.type;

        if (settingType === 'boolean') {
            // CASE: Ensure we won't forward strings, otherwise model events or model interactions can fail
            if (attrs.value === '0' || attrs.value === '1') {
                attrs.value = !!+attrs.value;
            }

            // CASE: Ensure we won't forward strings, otherwise model events or model interactions can fail
            if (attrs.value === 'false' || attrs.value === 'true') {
                attrs.value = JSON.parse(attrs.value);
            }

            if (_.isBoolean(attrs.value)) {
                attrs.value = attrs.value.toString();
            }
        }

        return attrs;
    },

    parse() {
        const attrs = ghostBookshelf.Model.prototype.parse.apply(this, arguments);

        // transform "0" to false for boolean type
        const settingType = attrs.type;
        if (settingType === 'boolean' && (attrs.value === '0' || attrs.value === '1')) {
            attrs.value = !!+attrs.value;
        }

        // transform "false" to false for boolean type
        if (settingType === 'boolean' && (attrs.value === 'false' || attrs.value === 'true')) {
            attrs.value = JSON.parse(attrs.value);
        }

        return attrs;
    }
}, {
    findOne: function (data, options) {
        if (_.isEmpty(data)) {
            options = data;
        }

        // Allow for just passing the key instead of attributes
        if (!_.isObject(data)) {
            data = {key: data};
        }

        return Promise.resolve(ghostBookshelf.Model.findOne.call(this, data, options));
    },

    edit: function (data, unfilteredOptions) {
        const options = this.filterOptions(unfilteredOptions, 'edit');
        const self = this;

        if (!Array.isArray(data)) {
            data = [data];
        }

        return Promise.map(data, function (item) {
            // Accept an array of models as input
            if (item.toJSON) {
                item = item.toJSON();
            }
            if (!(_.isString(item.key) && item.key.length > 0)) {
                return Promise.reject(new errors.ValidationError({message: i18n.t('errors.models.settings.valueCannotBeBlank')}));
            }

            item = self.filterData(item);

            return Settings.forge({key: item.key}).fetch(options).then(function then(setting) {
                if (setting) {
                    // it's allowed to edit all attributes in case of importing/migrating
                    if (options.importing) {
                        return setting.save(item, options);
                    } else {
                        // If we have a value, set it.
                        if (Object.prototype.hasOwnProperty.call(item, 'value')) {
                            setting.set('value', item.value);
                        }
                        // Internal context can overwrite type (for fixture migrations)
                        if (options.context && options.context.internal && Object.prototype.hasOwnProperty.call(item, 'type')) {
                            setting.set('type', item.type);
                        }

                        // If anything has changed, save the updated model
                        if (setting.hasChanged()) {
                            return setting.save(null, options);
                        }

                        return setting;
                    }
                }

                return Promise.reject(new errors.NotFoundError({message: i18n.t('errors.models.settings.unableToFindSetting', {key: item.key})}));
            });
        });
    },

    populateDefaults: async function populateDefaults(unfilteredOptions) {
        const options = this.filterOptions(unfilteredOptions, 'populateDefaults');
        const self = this;

        if (!options.context) {
            options.context = internalContext.context;
        }

        // this is required for sqlite to pick up the columns after db init
        await ghostBookshelf.knex.destroy();
        await ghostBookshelf.knex.initialize();

        // fetch available columns to avoid populating columns not yet created by migrations
        const columnInfo = await ghostBookshelf.knex.table('settings').columnInfo();
        const columns = Object.keys(columnInfo);

        // fetch other data that is used when inserting new settings
        const date = ghostBookshelf.knex.raw('CURRENT_TIMESTAMP');
        let owner;
        try {
            owner = await ghostBookshelf.model('User').getOwnerUser();
        } catch (e) {
            // in some tests the owner is deleted and not recreated before setup
            if (e.errorType === 'NotFoundError') {
                owner = {id: 1};
            } else {
                throw e;
            }
        }

        return this
            .findAll(options)
            .then(function checkAllSettings(allSettings) {
                const usedKeys = allSettings.models.map(function mapper(setting) {
                    return setting.get('key');
                });

                const insertOperations = [];

                _.each(getDefaultSettings(), function forEachDefault(defaultSetting, defaultSettingKey) {
                    const isMissingFromDB = usedKeys.indexOf(defaultSettingKey) === -1;
                    if (isMissingFromDB) {
                        defaultSetting.value = defaultSetting.getDefaultValue();

                        const settingValues = Object.assign({}, defaultSetting, {
                            id: ObjectID.generate(),
                            created_at: date,
                            created_by: owner.id,
                            updated_at: date,
                            updated_by: owner.id
                        });

                        insertOperations.push(
                            ghostBookshelf.knex
                                .table('settings')
                                .insert(_.pick(settingValues, columns))
                        );
                    }
                });

                if (insertOperations.length > 0) {
                    return Promise.all(insertOperations).then(function fetchAllToReturn() {
                        return self.findAll(options);
                    });
                }

                return allSettings;
            });
    },

    permissible: function permissible(modelId, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasApiKeyPermission) {
        let isEdit = (action === 'edit');
        let isOwner;

        function isChangingMembers() {
            if (unsafeAttrs && unsafeAttrs.key === 'labs') {
                let editedValue = JSON.parse(unsafeAttrs.value);
                if (editedValue.members !== undefined) {
                    return editedValue.members !== settingsCache.get('labs').members;
                }
            }
        }

        isOwner = loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Owner'});

        if (isEdit && isChangingMembers()) {
            // Only allow owner to toggle members flag
            hasUserPermission = isOwner;
        }

        if (hasUserPermission && hasApiKeyPermission) {
            return Promise.resolve();
        }

        return Promise.reject(new errors.NoPermissionError({
            message: i18n.t('errors.models.post.notEnoughPermission')
        }));
    }
});

module.exports = {
    Settings: ghostBookshelf.model('Settings', Settings)
};
