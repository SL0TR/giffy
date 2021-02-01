const express = require('express');
const authMiddleware = require('@middlewares/authMiddleware');
const router = express.Router({ mergeParams: true });
const controller = require('./controller');

router.put(
  '/password',
  [authMiddleware.decodeAuthToken(), authMiddleware.getFreshUser()],
  async function (req, res) {
    const { statusCode, data } = await controller.updatePassword(req);
    res.status(statusCode).send(data);
  }
);

// router.put(
//   '/profile',
//   [authMiddleware.decodeAuthToken(), authMiddleware.getFreshUser()],
//   async function(req, res) {
//     const { statusCode, data } = await controller.updateProfile(req);
//     res.status(statusCode).send(data);
//   }
// );

module.exports = router;
