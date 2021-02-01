const configMap = {
  development: require('./development'),
  production: require('./production'),
};

module.exports = Object.assign(
  require('./default'),
  configMap[process.env.NODE_ENV || 'development']
);
