import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Row, Col, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';
import VideoPlayback from './VideoPlayback';
import VideoUpload from './VideoUpload';
import Gif from './Gif';
import GifUploadSucc from './GifUploadSucc';

const ffmpeg = createFFmpeg({ log: true });

function VideoToGif() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [video, setVideo] = useState();
  const [converting, setConverting] = useState(false);
  const [blob, setBlob] = useState();
  const [blobString, setBlobString] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const loadFFmpeg = async () => {
    await ffmpeg.load();
    setIsFFmpegLoaded(true);
  };

  async function convertToGif() {
    setConverting(true);
    ffmpeg.FS('writeFile', video.name || 'test.mp4', await fetchFile(video));

    await ffmpeg.run(
      '-i',
      video.name || 'test.mp4',
      '-r',
      '5',
      '-vf',
      'scale=320:-1:flags=lanczos',
      '-t',
      '8',
      '-f',
      'gif',
      'converted.gif',
    );

    const data = ffmpeg.FS('readFile', 'converted.gif');
    const dataBlob = new Blob([data.buffer], { type: 'image/gif' });

    setBlob(dataBlob);
    setBlobString(URL.createObjectURL(dataBlob));
    setConverting(false);
    setVideo(null);
  }

  useEffect(() => {
    if (!ffmpeg.isLoaded()) {
      loadFFmpeg();
    } else {
      setIsFFmpegLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (uploadSuccess) {
      ffmpeg.FS('unlink', 'converted.gif');
      setVideo(null);
      setConverting(false);
      setBlobString(null);
    }
  }, [uploadSuccess]);

  if (!isFFmpegLoaded) {
    return <Loader />;
  }

  if (uploadSuccess) {
    return <GifUploadSucc setUploadSuccess={setUploadSuccess} />;
  }

  return (
    <Row gutter={[20, 20]} align="middle" justify="center">
      <VideoUpload setVideo={setVideo} setBlobString={setBlobString} />
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
      {blobString && (
        <Gif
          setUploadSuccess={setUploadSuccess}
          blobString={blobString}
          blob={blob}
        />
      )}
    </Row>
  );
}

export default VideoToGif;
