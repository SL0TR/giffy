import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Typography } from 'antd';

function LikeList({ list = [] }) {
  return (
    <Row>
      {list.map(el => (
        <Col key={el?.email} span={24}>
          <Typography.Text>{el?.email}</Typography.Text>
        </Col>
      ))}
    </Row>
  );
}
LikeList.propTypes = {
  list: PropTypes.array,
};
export default LikeList;
