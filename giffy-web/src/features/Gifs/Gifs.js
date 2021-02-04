import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'antd';
import { getAllGifsReq, getMyGifsReq } from './reducer';
import SingleGifCard from './SingleGifCard';

function Gifs({ isPublic = true }) {
  const dispatch = useDispatch();
  const { myGifs, allGifs } = useSelector(state => state?.Gif);

  useEffect(() => {
    if (isPublic) {
      dispatch(getAllGifsReq());
    } else {
      dispatch(getMyGifsReq());
    }
  }, []);

  return (
    <Row gutter={[20, 40]}>
      {isPublic &&
        allGifs.map(gif => (
          <SingleGifCard key={gif?._id} gif={gif} isPublic={isPublic} />
        ))}
      {!isPublic &&
        myGifs.map(gif => (
          <SingleGifCard key={gif?._id} gif={gif} isPublic={isPublic} />
        ))}
    </Row>
  );
}

Gifs.propTypes = {
  isPublic: PropTypes.bool,
};

export default Gifs;
