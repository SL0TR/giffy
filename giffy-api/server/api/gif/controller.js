const { StatusCodes } = require('http-status-codes');
const Gif = require('./model');

async function createGif(req) {
  const { url } = req.body;

  const gif = {
    url,
    user: req?.user?._id,
  };

  try {
    const newGif = await Gif.create(gif);
    return {
      statusCode: StatusCodes.CREATED,
      data: { gifId: newGif._id },
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

async function getAllUserGifs(req) {
  try {
    const gifs = await Gif.find({ user: req.user._id })
      .sort('-createdAt')
      .populate('user', 'email');

    return {
      statusCode: StatusCodes.OK,
      data: { total: gifs.length, data: gifs },
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

async function getAllGifs(req) {
  try {
    const gifs = await Gif.find({ isPublic: true }).sort('-created_at');

    return {
      statusCode: StatusCodes.OK,
      data: { total: gifs.length, data: gifs },
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

async function updateGif(req) {
  const { isPublic, likes, comments } = req.body;

  console.log(isPublic);

  if (!req.params.id) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      data: { message: 'Params Missing' },
    };
  }

  const { id: gifId } = req.params;

  try {
    await Gif.findByIdAndUpdate(gifId, { isPublic });

    return {
      statusCode: StatusCodes.OK,
      data: { success: true },
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

module.exports = {
  createGif,
  getAllUserGifs,
  updateGif,
  getAllGifs,
};
