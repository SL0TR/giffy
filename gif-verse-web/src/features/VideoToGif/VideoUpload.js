import React from 'react';
import { Upload, message, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import { InboxOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { customRequest } from './helper';

const { Dragger } = Upload;

function VideoUpload({ setVideo, setGif }) {
  function onVideoUploadChange(info) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);

      if (info?.file?.originFileObj) {
        setVideo(info.file.originFileObj);
        setGif(null);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <Col span={15}>
      <Dragger
        showUploadList={false}
        customRequest={customRequest}
        name="file"
        onChange={onVideoUploadChange}
        action={() => {}}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          <FormattedMessage id="Click or drag file to this area to convert video to GIF" />
        </p>
      </Dragger>
    </Col>
  );
}

VideoUpload.propTypes = {
  setVideo: PropTypes.func,
  setGif: PropTypes.func,
};

export default VideoUpload;
