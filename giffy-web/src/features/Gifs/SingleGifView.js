/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import {
  Col,
  Divider,
  Image,
  Row,
  Typography,
  Comment,
  Tooltip,
  Popover,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CustomScrollBars from 'components/CustomScroll';
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useIntl } from 'react-intl';
import CommentEditor from './CommentEditor';
import { getSingleGiffReq, updateGifReq } from './reducer';
import { toggleLike } from './helper';
import LikeList from './LikeList';

dayjs.extend(relativeTime);

function SingleGifView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();
  const { messages } = useIntl();
  const theme = useTheme();
  const user = useSelector(reduxState => reduxState.Auth.user);
  const [gif, setGif] = useState();

  const hasUserLikedGif =
    gif && gif.likes.some(like => like?._id === user?._id);

  function onLikeChange() {
    toggleLike({
      dispatch,
      updateGifReq,
      gif,
      user,
      hasUserLikedGif,
      nestedIds: true,
      setGif,
      sentFrom: state?.sentFrom,
      index: state?.index,
    });
  }

  useEffect(() => {
    dispatch(getSingleGiffReq({ id, setGif }));
  }, []);

  return (
    <Row gutter={40} align="middle">
      <Col xl={{ span: 14 }} xs={{ span: 24 }}>
        <Image width="100%" src={gif?.url} />
      </Col>
      <Col xl={{ span: 10 }} xs={{ span: 24 }} span={10}>
        <Row>
          <Col span={24}>
            <Typography.Paragraph level={4}>
              {`${messages['Uploaded By']} ${gif?.user?.email}`}
            </Typography.Paragraph>
            <Divider />
          </Col>
          <CustomScrollBars style={{ height: '40rem' }}>
            <Col span={24}>
              {gif?.comments.map(comment => (
                <Comment
                  key={comment?._id || comment?.user}
                  author={comment?.user?.email}
                  content={<Typography.Text>{comment?.text}</Typography.Text>}
                  datetime={
                    <Tooltip
                      title={dayjs(comment?.createdAt).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                    >
                      <span>{dayjs(comment?.createdAt).fromNow()}</span>
                    </Tooltip>
                  }
                />
              ))}
            </Col>
          </CustomScrollBars>
          <Col span={24}>
            <Row gutter={20}>
              <Col>
                {hasUserLikedGif ? (
                  <LikeFilled
                    style={{ color: theme.accent }}
                    onClick={onLikeChange}
                  />
                ) : (
                  <LikeOutlined onClick={onLikeChange} />
                )}

                <Popover
                  content={<LikeList list={gif?.likes} />}
                  title="Liked by"
                >
                  {` ${gif?.likes.length} ${messages['likes']}`}
                </Popover>
              </Col>
              <Col>
                <CommentOutlined />{' '}
                {`${gif?.comments.length} ${messages['comments']}`}
              </Col>
            </Row>
            <Divider />
            <Comment
              content={
                <CommentEditor
                  gif={gif}
                  sentFrom={state?.sentFrom}
                  setGif={setGif}
                  index={state?.index}
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SingleGifView;
