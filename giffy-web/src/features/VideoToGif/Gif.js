import { Button, Col } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function Gif({ gif }) {
  return (
    <>
      <Col span={15} align="middle">
        <img src={gif} style={{ width: '100%' }} alt="converted gif" />
      </Col>
      <Col span={24} align="middle">
        <Button size="large" type="primary">
          <FormattedMessage id="Save GIF" />
        </Button>
      </Col>
    </>
  );
}

Gif.propTypes = {
  gif: PropTypes.string,
};

export default Gif;
