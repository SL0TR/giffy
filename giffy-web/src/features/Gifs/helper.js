export function toggleLike({
  dispatch,
  updateGifReq,
  gif,
  userId,
  hasUserLikedGif,
}) {
  const likes = hasUserLikedGif
    ? gif.likes.map(el => el?._id).filter(id => id !== userId)
    : [userId, ...gif.likes];
  console.log(likes);
  dispatch(
    updateGifReq({
      id: gif?._id,
      reqData: {
        likes,
      },
    }),
  );
}
