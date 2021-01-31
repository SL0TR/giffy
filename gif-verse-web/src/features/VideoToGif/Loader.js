import React from 'react';
import { Spin, Row, Col, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

function Loader() {
  return (
    <Row justify="center">
      <Col span={24} align="middle">
        <Spin size="large" />
      </Col>
      <Typography.Paragraph style={{ marginTop: 10 }}>
        <FormattedMessage id="FFMPEG wasm is loading..." />
      </Typography.Paragraph>
    </Row>
  );
}

export default Loader;
