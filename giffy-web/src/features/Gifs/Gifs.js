import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Typography } from 'antd';
import { PRIVATE_ROUTE } from 'router';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
    <Row gutter={[20, myGifs.length ? 30 : 0]}>
      {isPublic &&
        allGifs.map((gif, index) => (
          <SingleGifCard
            index={index}
            key={gif?._id}
            gif={gif}
            isPublic={isPublic}
          />
        ))}
      {!isPublic && !myGifs.length && (
        <Col span={24}>
          <Row gutter={[0, 20]}>
            <Col span={24} align="middle">
              <Typography.Text>
                <FormattedMessage id="You dont have any GIFs uplaoded, go the converter and upload to see them here!" />
              </Typography.Text>
            </Col>
            <Col span={24} align="middle">
              <Link
                to={`/${PRIVATE_ROUTE.DASHBOARD}/${PRIVATE_ROUTE.VID_TO_GIF_PAGE}`}
              >
                <Button size="large" type="primary">
                  <FormattedMessage id="Convert" />
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      )}
      {!isPublic &&
        myGifs.map((gif, index) => (
          <SingleGifCard
            index={index}
            key={gif?._id}
            gif={gif}
            isPublic={isPublic}
          />
        ))}
    </Row>
  );
}

Gifs.propTypes = {
  isPublic: PropTypes.bool,
};

export default Gifs;
