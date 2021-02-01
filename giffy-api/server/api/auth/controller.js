const User = require('@api/user/model');
const authUtil = require('@root/utils/authUtil');
const statusCodes = require('http-status-codes');
const { generateAuthHash } = require('./helper');

async function createUser(user) {
  const { email, passCode } = user;

  if (!email && !passCode) {
    return {
      statusCode: statusCodes.BAD_REQUEST,
      data: { message: 'Please enter all fields' },
    };
  }
  try {
    const existingUser = await User.findOne({ email: user.email }).select(
      ' _id'
    );

    if (existingUser) {
      return {
        statusCode: statusCodes.UNAUTHORIZED,
        data: { message: 'This email already exists!' },
      };
    }
  } catch (e) {
    return {
      statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      data: { message: 'Soomething went wrong D:' },
    };
  }

  try {
    const newUser = await User.create(user);

    const authToken = await authUtil.signAuthToken(email);

    return {
      statusCode: statusCodes.CREATED,
      data: {
        authToken,
        user: { email: newUser.email },
      },
    };
  } catch (e) {
    return {
      statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

async function signIn(user) {
  const { email, passCode } = user;

  if (!email || !passCode) {
    return {
      statusCode: statusCodes.BAD_REQUEST,
      data: { message: 'Please enter all fields' },
    };
  }

  try {
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      return {
        statusCode: statusCodes.UNAUTHORIZED,
        data: { message: `User does't exist!` },
      };
    }

    if (!existingUser.authenticate(passCode)) {
      return {
        statusCode: statusCodes.UNAUTHORIZED,
        data: { message: `Wrong Password!` },
      };
    }

    const authToken = await authUtil.signAuthToken(existingUser.email);

    const { email } = existingUser;
    return {
      statusCode: statusCodes.OK,
      data: {
        authToken,
        user: { email },
      },
    };
  } catch (e) {
    return {
      statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

module.exports = {
  signIn,
  createUser,
};
