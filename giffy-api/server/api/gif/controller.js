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

async function getAllGifs(req) {
  let { pageNum, pageSize } = req.query;

  pageNum = Number(parseInt(pageNum));
  pageSize = Number(parseInt(pageSize));

  try {
    // const Gifs = await Gif.aggregate(GifAggOpts).sort({
    //   'transactions.createdAt' : -1
    // });
    return {
      statusCode: StatusCodes.OK,
      // data: { total: Gifs.length, data: Gifs },
    };
  } catch (e) {
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: { message: e.message },
    };
  }
}

async function updateGif(req) {
  if (!req.params.id)
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      data: { message: 'Params Missing' },
    };

  const { id: GifId } = req.params;

  try {
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
  getAllGifs,
  updateGif,
};
