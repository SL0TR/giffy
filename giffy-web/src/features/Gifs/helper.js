export function toggleLike({
  dispatch,
  updateGifReq,
  gif,
  userId,
  hasUserLikedGif,
  setGif,
  nestedIds = false,
}) {
  let likes = [];

  if (nestedIds) {
    const onlyIds = gif.likes.map(el => el?._id);

    likes = hasUserLikedGif
      ? onlyIds.filter(id => id !== userId)
      : [userId, ...onlyIds];
  } else {
    likes = hasUserLikedGif
      ? gif.likes.filter(id => id !== userId)
      : [userId, ...gif.likes];
  }

  console.log(likes);

  dispatch(
    updateGifReq({
      id: gif?._id,
      reqData: {
        likes,
      },
      setGif,
    }),
  );
}
