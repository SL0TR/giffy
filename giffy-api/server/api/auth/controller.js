const User = require('@api/user/model');
const authUtil = require('@root/utils/authUtil');
const { StatusCodes } = require('http-status-codes');

async function createUser(user) {
  const { email, password } = user;

  if (!email && !password) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      data: { message: 'Please enter all fields' },
    };
  }
  try {
    const existingUser = await User.findOne({ email: user.email }).select(
      ' _id'
    );

    if (existingUser) {
      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        data: { message: 'This email already exists!' },
      };
    }
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: 'Soomething went wrong D:' },
    };
  }

  try {
    const newUser = await User.create(user);

    const authToken = await authUtil.signAuthToken(email);

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        authToken,
        user: { email: newUser.email, _id: newUser._id },
      },
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

async function signIn(user) {
  const { email, password } = user;

  if (!email || !password) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      data: { message: 'Please enter all fields' },
    };
  }

  try {
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      return {
        statusCode: StatusCodes.FORBIDDEN,
        data: { message: "User does't exist!" },
      };
    }

    if (!existingUser.authenticate(password)) {
      return {
        statusCode: StatusCodes.FORBIDDEN,
        data: { message: 'Wrong Password!' },
      };
    }

    const authToken = await authUtil.signAuthToken(existingUser.email);

    const { email, _id } = existingUser;

    return {
      statusCode: StatusCodes.OK,
      data: {
        authToken,
        user: { email, _id },
      },
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

module.exports = {
  signIn,
  createUser,
};
