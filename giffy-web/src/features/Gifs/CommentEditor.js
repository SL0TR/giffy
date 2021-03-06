import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateGifReq } from './reducer';

const { TextArea } = Input;

function CommentEditor({ gif, setGif, sentFrom, index }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user);
  const [comment, setComment] = useState(null);
  const { id } = useParams();

  const handleCommentAdd = () => {
    dispatch(
      updateGifReq({
        id,
        reqData: {
          comments: [
            {
              user: user?._id,
              text: comment,
            },
            ...gif?.comments,
          ],
        },
        setGif,
        sentFrom,
        index,
      }),
    );
    setComment(null);
  };

  return (
    <Row gutter={20}>
      <Col xl={{ span: 18 }} xs={{ span: 24 }}>
        <TextArea
          rows={2}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </Col>
      <Col span={6} align="top">
        <Button
          onClick={handleCommentAdd}
          className="float-right"
          type="primary"
          style={{ marginTop: 15 }}
        >
          <FormattedMessage id="Add Comment" />
        </Button>
      </Col>
    </Row>
  );
}

CommentEditor.propTypes = {
  gif: PropTypes.object,
  setGif: PropTypes.func,
  sentFrom: PropTypes.string,
  index: PropTypes.number,
};

export default CommentEditor;
