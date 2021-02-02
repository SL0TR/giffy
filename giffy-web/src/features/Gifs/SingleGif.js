/* eslint-disable react/jsx-indent */
import React from 'react';
import { Card, Row, Col, Switch } from 'antd';
import {
  CommentOutlined,
  DeleteOutlined,
  EyeOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateGifReq } from './reducer';

const { Meta } = Card;

function SingleGif({ gif, isPublic }) {
  const dispatch = useDispatch();

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

  const actions = isPublic
    ? [
        <LikeOutlined key="like" />,
        <CommentOutlined key="comment" />,
        <EyeOutlined key="view" />,
      ]
    : [
        <EyeOutlined key="view" />,
        <DeleteOutlined key="delete" />,
        <Switch
          onChange={handleSwitchChange}
          checked={gif?.isPublic}
          checkedChildren="Public"
          unCheckedChildren="Private"
        />,
      ];

  return (
    <Col span={8}>
      <Card cover={<img alt="gif" src={gif?.url} />} actions={actions}>
        <Meta
          // title={gif?.user?.email}
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

SingleGif.propTypes = {
  gif: PropTypes.object,
  isPublic: PropTypes.bool,
};

export default SingleGif;
