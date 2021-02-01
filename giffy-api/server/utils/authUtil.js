const jwt = require('jsonwebtoken');
const config = require('@config');

async function verifyToken(token) {
  try {
    var decodedToken = await jwt.verify(token, config.JWT_SECRET);
    return decodedToken;
  } catch (err) {
    throw err;
  }
}

async function signToken(payload, expiryTime) {
  try {
    const signedToken = await jwt.sign(
      {
        email: payload,
      },
      config.JWT_SECRET,
      { expiresIn: expiryTime }
    );
    return signedToken;
  } catch (err) {
    throw err;
  }
}

function signAuthToken(payload) {
  return signToken(payload, config.JWT_AUTH_TOKEN_EXPIRY_TIME);
}

module.exports = {
  signAuthToken,
  verifyToken,
};
