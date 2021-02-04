/* eslint-disable react/jsx-indent */
import React from 'react';
import { Card, Row, Col, Switch, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { deleteGifReq, updateGifReq } from './reducer';
import { toggleLike } from './helper';

const { Meta } = Card;

function SingleGifCard({ gif, isPublic, index }) {
  const dispatch = useDispatch();
  const userId = useSelector(reduxState => reduxState.Auth.user?._id);
  const theme = useTheme();
  const hasUserLikedGif = gif.likes.some(id => id === userId);

  const shareBtn = (
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${gif.url}&t=Giffy FTW`}
      target="_blank"
      rel="noreferrer"
    >
      <ShareAltOutlined key="share" />
    </a>
  );

  function handleSwitchChange(val) {
    dispatch(
      updateGifReq({
        id: gif?._id,
        reqData: {
          isPublic: val,
        },
      }),
    );
  }

  function confirm() {
    dispatch(deleteGifReq(gif?._id));
  }

  const actions = isPublic
    ? [
        hasUserLikedGif ? (
          <LikeFilled
            style={{ color: theme.accent }}
            onClick={() =>
              toggleLike({
                dispatch,
                updateGifReq,
                gif,
                userId,
                hasUserLikedGif,
              })
            }
            key="like"
          />
        ) : (
          <LikeOutlined
            onClick={() =>
              toggleLike({
                dispatch,
                updateGifReq,
                gif,
                userId,
                hasUserLikedGif,
              })
            }
          />
        ),
        shareBtn,
      ]
    : [
        shareBtn,
        <Popconfirm
          title="Are you sure to delete this GIF?"
          onConfirm={confirm}
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>,
        <Switch
          onChange={handleSwitchChange}
          checked={gif?.isPublic}
          checkedChildren="Public"
          unCheckedChildren="Private"
        />,
      ];

  return (
    <Col span={8}>
      <Card
        cover={
          <Link
            to={{
              pathname: `${gif?._id}`,
              state: { index, cameFrom: isPublic ? 'allGifs' : 'myGifs' },
            }}
          >
            <img alt="gif" width="100%" src={gif?.url} />
          </Link>
        }
        actions={actions}
      >
        <Meta
          description={
            <Row>
              <Col span={12} align="middle">
                <p>{`${gif?.likes.length} likes`}</p>
              </Col>
              <Col span={12} align="middle">
                <p>{`${gif?.comments.length} comments`}</p>
              </Col>
            </Row>
          }
        />
      </Card>
    </Col>
  );
}

SingleGifCard.propTypes = {
  gif: PropTypes.object,
  isPublic: PropTypes.bool,
  index: PropTypes.number,
};

export default SingleGifCard;
