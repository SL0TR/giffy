import { Button, Col, message } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { GifApi } from 'api';
import { fromUint8Array } from 'js-base64';

function Gif({ gif, arrBuff }) {
  // const [base64, setBase64] = useState();

  async function handleGifSubmit() {
    console.log(typeof gif, gif);

    // setBase64(fromUint8Array(arrBuff));
    // const reader = new FileReader();
    // reader.onload = function (event) {
    //   const base64 = event.target.result;
    //   console.log(base64);
    // };

    // reader.readAsDataURL(gif);
    // const gifFile = new File([gif], 'converted.gif', { type: 'image/gif' });
    // const data = new FormData();
    // data.append('file', gifFile);
    // // data.append('upload_preset', 'giffyupload');

    // console.log(gifFile, data);
    try {
      // const res = await axios.post(
      //   'https://api.cloudinary.com/v1_1/sl0tr/upload',
      //   data,
      // );
      const res = await GifApi.create({ base64: fromUint8Array(arrBuff) });
      console.log(res);
    } catch (e) {
      message.error(e?.message);
    }
  }

  return (
    <>
      <Col span={15} align="middle">
        <img src={gif} style={{ width: '100%' }} alt="converted gif" />
      </Col>
      {/* <img src={`data:image/gif;base64, ${base64}`} alt="" /> */}
      <Col span={24} align="middle">
        <Button onClick={handleGifSubmit} size="large" type="primary">
          <FormattedMessage id="Save GIF" />
        </Button>
      </Col>
    </>
  );
}

Gif.propTypes = {
  gif: PropTypes.string,
  arrBuff: PropTypes.object,
};

export default Gif;
