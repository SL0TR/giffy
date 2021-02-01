const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('./controller');

const authMiddleware = require('@middlewares/authMiddleware');

router.post(
  '/',
  [authMiddleware.decodeAuthToken(), authMiddleware.getFreshUser()],
  async function (req, res) {
    const { statusCode, data } = await controller.createGif(req);
    res.status(statusCode).send(data);
  }
);

router.get(
  '/',
  [authMiddleware.decodeAuthToken(), authMiddleware.getFreshUser()],
  async function (req, res) {
    const { statusCode, data } = await controller.getAllGifs(req);
    res.status(statusCode).send(data);
  }
);

router.put(
  '/:id',
  [authMiddleware.decodeAuthToken(), authMiddleware.getFreshUser()],
  async function (req, res) {
    const { statusCode, data } = await controller.updateGif(req);
    res.status(statusCode).send(data);
  }
);

module.exports = router;
