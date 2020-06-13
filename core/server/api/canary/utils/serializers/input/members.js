const _ = require('lodash');
const debug = require('ghost-ignition').debug('api:canary:utils:serializers:input:members');

function defaultRelations(frame) {
    if (frame.options.withRelated) {
        return;
    }

    if (frame.options.columns && !frame.options.withRelated) {
        return false;
    }

    frame.options.withRelated = ['labels'];
}

module.exports = {
    browse(apiConfig, frame) {
        debug('browse');
        defaultRelations(frame);
    },

    read() {
        debug('read');

        this.browse(...arguments);
    },

    add(apiConfig, frame) {
        debug('add');
        if (frame.data.members[0].labels) {
            frame.data.members[0].labels.forEach((label, index) => {
                if (_.isString(label)) {
                    frame.data.members[0].labels[index] = {
                        name: label
                    };
                }
            });
        }
        defaultRelations(frame);
    },

    edit(apiConfig, frame) {
        debug('edit');
        this.add(apiConfig, frame);
    }
};
