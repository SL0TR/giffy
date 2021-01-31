import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Row, Col, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';
import VideoPlayback from './VideoPlayback';
import VideoUpload from './VideoUpload';
import Gif from './Gif';

const ffmpeg = createFFmpeg({ log: true });

function VideoToGif() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [converting, setConverting] = useState(false);

  const loadFFmpeg = async () => {
    await ffmpeg.load();
    setIsFFmpegLoaded(true);
  };

  async function convertToGif() {
    console.log(ffmpeg.isLoaded());
    setConverting(true);
    ffmpeg.FS('writeFile', video.name || 'test.mp4', await fetchFile(video));

    await ffmpeg.run(
      '-i',
      video.name || 'test.mp4',
      '-ss',
      '2.0',
      '-f',
      'gif',
      'converted.gif',
    );

    const data = ffmpeg.FS('readFile', 'converted.gif');

    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/gif' }),
    );

    setConverting(false);
    setGif(url);
    setVideo(null);
  }

  useEffect(() => {
    if (!ffmpeg.isLoaded()) {
      loadFFmpeg();
    } else {
      setIsFFmpegLoaded(true);
    }
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
          <Button
            loading={converting}
            type="primary"
            size="large"
            onClick={convertToGif}
          >
            <FormattedMessage id="Convert to GIF" />
          </Button>
        </Col>
      )}
      {gif && <Gif gif={gif} />}
    </Row>
  );
}

export default VideoToGif;
