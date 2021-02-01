const config = require('@config');
const debug = require('debug')(config.SERVER_NAME);

debug.enabled = true;

module.exports = {
  log: debug,
};
