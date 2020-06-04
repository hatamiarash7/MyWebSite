// # Title Helper
// Usage: `{{title}}`
//
// Overrides the standard behaviour of `{[title}}` to ensure the content is correctly escaped

const {SafeString, escapeExpression} = require('../services/proxy');

module.exports = function title() {
    return new SafeString(escapeExpression(this.title || ''));
};
