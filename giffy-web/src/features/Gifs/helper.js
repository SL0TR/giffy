export function toggleLike({
  dispatch,
  updateGifReq,
  gif,
  user,
  hasUserLikedGif,
  setGif,
  nestedIds = false,
  sentFrom,
  index,
}) {
  let likes = [];
  let nestedLikes = [];

  if (nestedIds) {
    const onlyIds = gif.likes.map(el => el?._id);

    likes = hasUserLikedGif
      ? onlyIds.filter(id => id !== user?._id)
      : [user?._id, ...onlyIds];

    nestedLikes = hasUserLikedGif
      ? gif?.likes.filter(el => el?._id !== user?._id)
      : [user, ...gif?.likes];
  } else {
    likes = hasUserLikedGif
      ? gif.likes.filter(id => id !== user?._id)
      : [user?._id, ...gif.likes];
  }

  console.log({
    hasUserLikedGif,
    nestedLikes,
    gifLikes: gif.likes,
    nestedIds,
    likes,
  });

  dispatch(
    updateGifReq({
      id: gif?._id,
      reqData: {
        likes,
      },
      setGif,
      sentFrom,
      index,
      nestedLikes,
    }),
  );
}
