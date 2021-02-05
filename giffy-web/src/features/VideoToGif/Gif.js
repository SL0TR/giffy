import React, { useEffect, useState } from 'react';
import { Button, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createGifReq } from 'features/Gifs';

function Gif({ blobString, blob, setUploadSuccess, uploadSuccess }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleGifSubmit() {
    const gifFile = new File([blob], 'converted.gif', { type: 'image/gif' });
    const data = new FormData();
    data.append('file', gifFile);
    data.append('upload_preset', 'giffyupload');
    setLoading(true);
    dispatch(createGifReq({ reqData: data, setUploadSuccess }));
  }

  useEffect(() => {
    if (uploadSuccess) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Col xl={{ span: 10 }} xs={{ span: 24 }} align="middle">
        <img src={blobString} width="100%" alt="converted gif" />
      </Col>
      <Col span={24} align="middle">
        <Button
          loading={loading}
          onClick={handleGifSubmit}
          size="large"
          type="primary"
        >
          <FormattedMessage id="Upload GIF" />
        </Button>
      </Col>
    </>
  );
}

Gif.propTypes = {
  blob: PropTypes.any,
  blobString: PropTypes.string,
  setUploadSuccess: PropTypes.func,
  uploadSuccess: PropTypes.bool,
};

export default Gif;
