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
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}

function initiate() {
  let app = _initialize_();

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
