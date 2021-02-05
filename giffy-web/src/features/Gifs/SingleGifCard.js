/* eslint-disable react/jsx-indent */
import React from 'react';
import { Card, Row, Col, Switch, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  DownloadOutlined,
  LikeFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { PRIVATE_ROUTE } from 'router';
import { FormattedMessage } from 'react-intl';
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

  const downloadBtn = (
    <a href={gif.url} download="downloaded">
      <DownloadOutlined key="download" />
    </a>
  );

  function handleSwitchChange(val) {
    dispatch(
      updateGifReq({
        id: gif?._id,
        reqData: {
          isPublic: val,
        },
        sentFrom: isPublic ? 'allGifs' : 'myGifs',
        index,
      }),
    );
  }

  function onLikeChange() {
    toggleLike({
      dispatch,
      updateGifReq,
      gif,
      user: { _id: userId },
      hasUserLikedGif,
      sentFrom: isPublic ? 'allGifs' : 'myGifs',
      index,
    });
  }

  function confirm() {
    dispatch(deleteGifReq({ id: gif?._id, index }));
  }

  const actions = isPublic
    ? [
        hasUserLikedGif ? (
          <LikeFilled
            style={{ color: theme.accent }}
            onClick={onLikeChange}
            key="like"
          />
        ) : (
          <LikeOutlined onClick={onLikeChange} />
        ),
        downloadBtn,
        shareBtn,
      ]
    : [
        shareBtn,
        <Popconfirm
          title={<FormattedMessage id="Are you sure to delete this GIF?" />}
          onConfirm={confirm}
        >
          <DeleteOutlined key="delete" />
        </Popconfirm>,
        <Switch
          onChange={handleSwitchChange}
          checked={gif?.isPublic}
          checkedChildren={<FormattedMessage id="Public" />}
          unCheckedChildren={<FormattedMessage id="Private" />}
        />,
      ];

  return (
    <Col xl={{ span: 12 }} xxl={{ span: 8 }} xs={{ span: 24 }}>
      <Card
        cover={
          <Link
            to={{
              pathname: `/${PRIVATE_ROUTE.DASHBOARD}/${gif?._id}`,
              state: {
                sentFrom: isPublic ? 'allGifs' : 'myGifs',
                index,
              },
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
                <p>
                  {`${gif?.likes.length} `}
                  <FormattedMessage id="likes" />
                </p>
              </Col>
              <Col span={12} align="middle">
                <p>
                  {`${gif?.comments.length} `}
                  <FormattedMessage id="comments" />
                </p>
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
