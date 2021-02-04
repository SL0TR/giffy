/**
 * This file will be rewritten in prod env by configuration management scripts
 */
module.exports = {
  DEFAULT_PORT: process.env.PORT || 8282,
  JWT_AUTH_TOKEN_EXPIRY_TIME: '30d',
  DB_URL: process.env.DB_URL_PROD,
  JWT_SECRET: process.env.JWT_SECRET,
};
