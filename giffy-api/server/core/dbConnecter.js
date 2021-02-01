const mongoose = require('mongoose');
const config = require('@config');
const logger = require('@core/logger');

function connectToDb() {
  const mongooseOpts = {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  };

  mongoose.connect(config.DB_URL, mongooseOpts, (err) => {
    if (!config.DB_URL) {
      throw new Error('No MongoDB string passed');
    }
    if (err) {
      logger.log('Some problem with the connection: ' + err);
    } else {
      logger.log('The Mongoose connection is ready!');
    }
  });
}

module.exports = {
  connectToDb,
};
