import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Row, Col, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';
import VideoPlayback from './VideoPlayback';
import VideoUpload from './VideoUpload';

const ffmpeg = createFFmpeg({ log: true });

function VideoToGif() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();

  const loadFFmpeg = async () => {
    await ffmpeg.load();
    setIsFFmpegLoaded(true);
  };

  async function convertToGif() {
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    await ffmpeg.run(
      '-i',
      'test.mp4',
      '-t',
      '2.5',
      '-ss',
      '2.0',
      '-f',
      'gif',
      'out.gif',
    );

    const data = ffmpeg.FS('readFile', 'out.gif');

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' }),
    );
    setGif(url);
    setVideo(null);
  }

  useEffect(() => {
    loadFFmpeg();
  }, []);

  if (!isFFmpegLoaded) {
    return <Loader />;
  }

  return (
    <Row gutter={[20, 20]} align="middle" justify="center">
      <VideoUpload setVideo={setVideo} setGif={setGif} />
      {video && <VideoPlayback video={video} />}
      {video && (
        <Col span={24} align="middle">
          <Button type="primary" size="large" onClick={convertToGif}>
            <FormattedMessage id="Convert to GIF" />
          </Button>
        </Col>
      )}
      {gif && (
        <Col span={15} align="middle">
          <img src={gif} style={{ width: '100%' }} alt="converted gif" />
        </Col>
      )}
    </Row>
  );
}

export default VideoToGif;
