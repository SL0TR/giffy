import React from 'react';
import { Button, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createGifReq } from 'features/Gifs';

function Gif({ blobString, blob, setUploadSuccess }) {
  const dispatch = useDispatch();

  async function handleGifSubmit() {
    const gifFile = new File([blob], 'converted.gif', { type: 'image/gif' });
    const data = new FormData();
    data.append('file', gifFile);
    data.append('upload_preset', 'giffyupload');
    dispatch(createGifReq({ reqData: data, setUploadSuccess }));
  }

  return (
    <>
      <Col span={10} align="middle">
        <img src={blobString} width="100%" alt="converted gif" />
      </Col>
      <Col span={24} align="middle">
        <Button onClick={handleGifSubmit} size="large" type="primary">
          <FormattedMessage id="Save GIF" />
        </Button>
      </Col>
    </>
  );
}

Gif.propTypes = {
  blob: PropTypes.any,
  blobString: PropTypes.string,
  setUploadSuccess: PropTypes.func,
};

export default Gif;
