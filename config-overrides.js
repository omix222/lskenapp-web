const path = require('path');

module.exports = (config, env) => {
    config.resolve.alias['handsontable'] = path.resolve(__dirname, 'node_modules/handsontable-pro');
    return config
}