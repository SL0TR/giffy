const statusCodes = require('http-status-codes');
const User = require('@api/user/model');
const authUtil = require('../utils/authUtil');

function getFreshUser() {
  return function (req, res, next) {
    if (req.user && req.user.phoneNum) {
      User.findOne({ phoneNum: req.user.phoneNum })
        .select('-passCode')
        .then(
          function (user) {
            if (!user) {
              res
                .status(statusCodes.UNAUTHORIZED)
                .send({ message: 'Unauthorized!' });
            } else {
              req.user = user;
              next();
            }
          },
          function (err) {
            next(err);
          }
        );
    } else {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .send({ message: 'Unauthorised' });
    }
  };
}

function decodeAuthToken() {
  return async function (req, res, next) {
    let authToken =
      req.headers['x-access-token'] || req.headers['authorization'];

    if (authToken && authToken.startsWith('Bearer ')) {
      authToken = authToken.slice(7, authToken.length);
    }

    if (authToken) {
      try {
        const decodedToken = await authUtil.verifyToken(authToken);
        const { phoneNum, authId } = decodedToken;
        req.user = {
          phoneNum,
          authId,
        };
        next();
      } catch (err) {
        if (err.name == 'TokenExpiredError') {
          return res.status(427).send({ message: 'AuthToken Expired' });
        }

        return res
          .status(statusCodes.UNAUTHORIZED)
          .send({ message: 'AuthToken is not valid' });
      }
    } else {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .send({ message: 'AuthToken is not supplied' });
    }
  };
}

function decodeRefreshToken() {
  return async function (req, res, next) {
    let refreshToken = req.body['refreshToken'];

    if (refreshToken) {
      try {
        const decodedToken = await authUtil.verifyToken(refreshToken);
        const { phoneNum, authId } = decodedToken;
        req.userRefreshToken = {
          phoneNum,
          authId,
        };
        next();
      } catch (err) {
        if (err.name == 'TokenExpiredError') {
          return res.status(433).send({ message: 'RefreshToken Expired' });
        }

        return res
          .status(statusCodes.UNAUTHORIZED)
          .send({ message: 'RefreshToken is not valid' });
      }
    } else {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .send({ message: 'Refresh token is not supplied' });
    }
  };
}

module.exports = {
  decodeAuthToken,
  decodeRefreshToken,
  getFreshUser,
};
