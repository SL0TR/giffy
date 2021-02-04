const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const httpRequestLogger = require('morgan');
const dbConnecter = require('@core/dbConnecter');

/**
 * Creates a barebone express app with basic setup.
 */
function _initialize_() {
  const app = express();
  dbConnecter.connectToDb();
  app.use(httpRequestLogger('dev'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));

  return app;
}

function initiate() {
  const app = _initialize_();

  return app;
}

/**
 * Explicitly define the client index.html absolute path and static directory to serve
 * @param indexPath
 * @param staticDirPath
 */

module.exports = {
  initiate,
};
