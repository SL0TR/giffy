const { StatusCodes } = require('http-status-codes');
const User = require('@api/user/model');
const bcrypt = require('bcrypt');

async function updatePassword(req) {
  const { newPassCode, currentPassCode } = req.body;

  if (!newPassCode || !currentPassCode) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      data: { message: 'Please enter all fields' },
    };
  }

  const userId = req.user._id;

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser.authenticate(currentPassCode)) {
      return {
        statusCode: StatusCodes.UNAUTHORIZED,
        data: { message: `Wrong Password!` },
      };
    }

    const newHash = await bcrypt.hash(newPassCode, 10);
    const updateInfo = {
      passCode: newHash,
    };

    const userUpdated = await User.findByIdAndUpdate(userId, updateInfo);
    const { shopName, ownerName, phoneNum } = userUpdated;

    return {
      statusCode: StatusCodes.OK,
      data: {
        message: 'User Password updated',
        user: { shopName, ownerName, phoneNum },
      },
    };
  } catch (err) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: err.message },
    };
  }
}

// async function updateProfile(req) {
//   const { shopName, ownerName, phoneNum } = req.body;
//   if (!shopName || !ownerName || !phoneNum)
//     return {
//       statusCode: StatusCodes.BAD_REQUEST,
//       data: { message: 'Please enter all fields' },
//     };

//   const userId = req.user._id;

//   try {
//     const foundUser = await User.findOne({ phoneNum })
//       .select(' phoneNum ')
//       .lean();
//     const phoneNumTaken = foundUser && String(foundUser._id) != String(userId);

//     if (phoneNumTaken) {
//       return {
//         statusCode: StatusCodes.CONFLICT,
//         data: { message: 'PhoneNum already taken!' },
//       };
//     }

//     const updateInfo = {
//       shopName,
//       ownerName,
//       phoneNum,
//     };

//     await User.findByIdAndUpdate(userId, updateInfo);

//     return {
//       statusCode: StatusCodes.OK,
//       data: {
//         message: 'User Profile updated',
//         user: updateInfo,
//       },
//     };
//   } catch (err) {
//     return {
//       statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
//       data: { message: err.message },
//     };
//   }
// }

module.exports = {
  updatePassword,
  // updateProfile,
};
