module.exports = {
  SERVER_NAME: 'giffy-api',
  DEFAULT_PORT: 8282,
  JWT_AUTH_TOKEN_EXPIRY_TIME: '30d',
  DB_URL: 'mongodb://localhost:27017/giffy',
  JWT_SECRET: process.env.JWT_SECRET,
};
