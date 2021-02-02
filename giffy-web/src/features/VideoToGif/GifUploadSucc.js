import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

function GifUploadSucc({ setUploadSuccess }) {
  return (
    <Result
      icon={<SmileOutlined />}
      title={
        <FormattedMessage id="Gif was succesfully uploaded to the cloud!" />
      }
      extra={
        <>
          <Button type="primary" onClick={() => setUploadSuccess(false)}>
            Convert and upload again!
          </Button>
          <Button type="link">See all your gifs</Button>
        </>
      }
    />
  );
}

GifUploadSucc.propTypes = {
  setUploadSuccess: PropTypes.func,
};

export default GifUploadSucc;
