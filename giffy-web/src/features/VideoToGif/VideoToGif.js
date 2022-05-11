import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { Row, Col, Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';
import VideoPlayback from './VideoPlayback';
import VideoUpload from './VideoUpload';
import Gif from './Gif';
import GifUploadSucc from './GifUploadSucc';

const ffmpeg = createFFmpeg({ log: true });

function VideoToGif() {
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [hasWasmError, setHasWasmError] = useState(false);
  const [video, setVideo] = useState();
  const [converting, setConverting] = useState(false);
  const [blob, setBlob] = useState();
  const [blobString, setBlobString] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [videoStartDuration, setVideoStartDuration] = useState();
  const [videoEndDuration, setVideoEndDuration] = useState();

  const loadFFmpeg = async () => {
    try {
       await ffmpeg.load();
       setIsFFmpegLoaded(true);
    } catch (err) {
      setHasWasmError(true);
    }
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
      videoEndDuration ? `${videoEndDuration}.0` : '8.0',
      '-ss',
      videoStartDuration ? `${videoStartDuration}.0` : '0.0',
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
    setVideoStartDuration(null);
    setVideoEndDuration(null);
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

  if(hasWasmError) {
    return  <Result
      status="500"
      title="Error"
      subTitle="Sorry, WebAssembly is not supported in your browser."
    />
    
  }


  if (!isFFmpegLoaded) {
    return <Loader />;
  }

  if (uploadSuccess) {
    return <GifUploadSucc setUploadSuccess={setUploadSuccess} />;
  }


  return (
    <Row gutter={[20, 20]} align="middle" justify="center">
      <VideoUpload
        setVideoStartDuration={setVideoStartDuration}
        setVideoEndDuration={setVideoEndDuration}
        setVideo={setVideo}
        video={video}
        setBlobString={setBlobString}
        blobString={blobString}
      />
      {video && (
        <VideoPlayback
          videoStartDuration={videoStartDuration}
          setVideoStartDuration={setVideoStartDuration}
          setVideoEndDuration={setVideoEndDuration}
          videoEndDuration={videoEndDuration}
          video={video}
        />
      )}
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
          uploadSuccess={uploadSuccess}
          setUploadSuccess={setUploadSuccess}
          blobString={blobString}
          blob={blob}
        />
      )}
    </Row>
  );
}

export default VideoToGif;
