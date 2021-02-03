import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PRIVATE_ROUTE } from 'router';

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
          <Link to={PRIVATE_ROUTE.MY_GIFS}>
            <Button type="ghost">See all your gifs</Button>
          </Link>
        </>
      }
    />
  );
}

GifUploadSucc.propTypes = {
  setUploadSuccess: PropTypes.func,
};

export default GifUploadSucc;
