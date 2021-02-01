const { StatusCodes } = require('http-status-codes');
const User = require('@api/user/model');
const authUtil = require('../utils/authUtil');

function getFreshUser() {
  return function (req, res, next) {
    if (req.user && req.user.email) {
      User.findOne({ email: req.user.email })
        .select('-password')
        .then(
          function (user) {
            if (!user) {
              res
                .status(StatusCodes.UNAUTHORIZED)
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
        .status(StatusCodes.UNAUTHORIZED)
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
        const { email } = decodedToken;
        req.user = {
          email,
        };
        next();
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(427).send({ message: 'AuthToken Expired' });
        }

        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ message: 'AuthToken is not valid' });
      }
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: 'AuthToken is not supplied' });
    }
  };
}

module.exports = {
  decodeAuthToken,
  getFreshUser,
};
