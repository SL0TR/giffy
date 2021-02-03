/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useLocation } from 'react-router';
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
import CommentEditor from './CommentEditor';
import { updateGifReq } from './reducer';
import { toggleLike } from './helper';
import LikeList from './LikeList';

dayjs.extend(relativeTime);

function SingleGifView() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const userId = useSelector(reduxState => reduxState.Auth.user?._id);
  const gif = useSelector(
    reduxState => reduxState.Gif[state?.cameFrom][state?.index],
  );
  const hasUserLikedGif = gif.likes.some(like => like?._id === userId);

  return (
    <Row gutter={40} align="middle">
      <Col span={14}>
        <Image width="100%" src={gif?.url} />
      </Col>
      <Col span={10}>
        <Row>
          <Col span={24}>
            <Typography.Paragraph level={4}>
              {`Uploaded By ${gif?.user?.email}`}
            </Typography.Paragraph>
            <Divider />
          </Col>
          <CustomScrollBars style={{ height: '40rem' }}>
            <Col span={24}>
              {gif?.comments.map(comment => (
                <Comment
                  key={comment?._id}
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
                )}

                <Popover
                  content={<LikeList list={gif.likes} />}
                  title="Liked by"
                >
                  {` ${gif?.likes.length} Likes`}
                </Popover>
              </Col>
              <Col>
                <CommentOutlined /> {gif?.comments.length} Comments
              </Col>
            </Row>
            <Divider />
            <Comment content={<CommentEditor gif={gif} />} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SingleGifView;
