import React from 'react';
import { Upload, message, Col } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { InboxOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { customRequest, getValidVideoFile } from './helper';

const { Dragger } = Upload;

function VideoUpload({
  setVideo,
  setBlobString,
  setVideoStartDuration,
  setVideoEndDuration,
  video,
  blobString,
}) {
  const { messages } = useIntl();
  console.log(!video && !blobString);

  function onVideoUploadChange(info) {
    const { status } = info.file;

    if (!getValidVideoFile(info.file, messages)) {
      return;
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);

      if (info?.file?.originFileObj) {
        setVideo(info.file.originFileObj);
        setBlobString(null);
      }
      setVideoStartDuration(null);
      setVideoEndDuration(null);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
    <Col xl={{ span: 15 }} xs={{ span: 24 }}>
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
      {!video && !blobString && (
        <p className="text-center" style={{ marginTop: 20 }}>
          <FormattedMessage id="Dont have a video file? Downlod and use the" />

          <a href="https://drive.google.com/drive/folders/1pzLhWimFEIVfEY5I9sQrnL4fV66ugnTu?usp=sharing">
            {` `}
            <FormattedMessage id="sample video files" />
          </a>
        </p>
      )}
    </Col>
  );
}

VideoUpload.propTypes = {
  setVideo: PropTypes.func,
  setBlobString: PropTypes.func,
  setVideoEndDuration: PropTypes.func,
  setVideoStartDuration: PropTypes.func,
  video: PropTypes.object,
  blobString: PropTypes.string,
};

export default VideoUpload;
