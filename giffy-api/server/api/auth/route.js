const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('./controller');

router.post('/register', async function (req, res) {
  const { statusCode, data } = await controller.createUser(req.body);
  res.status(statusCode).send(data);
});

router.post('/login', async function (req, res) {
  const { statusCode, data } = await controller.signIn(req.body);
  res.status(statusCode).send(data);
});

module.exports = router;
