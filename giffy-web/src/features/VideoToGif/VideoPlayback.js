import React, { useState, useEffect, useRef } from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';

function VideoPlayback({ video }) {
  const [vidContainerWidth, setVideContainerWidth] = useState();
  const [vidContainerHeight, setVideContainerHeight] = useState();
  const vidContainerRef = useRef(null);

  useEffect(() => {
    if (vidContainerRef.current) {
      setVideContainerWidth(vidContainerRef.current?.offsetWidth - 10);
      setVideContainerHeight(vidContainerRef.current?.offsetWidth / 1.78);
    }
  }, [vidContainerRef, video]);

  return (
    <Col ref={vidContainerRef} span={15} align="middle">
      <video
        controls
        height={vidContainerHeight}
        width={vidContainerWidth}
        src={URL.createObjectURL(video)}
      />
    </Col>
  );
}

VideoPlayback.propTypes = {
  video: PropTypes.string,
};

export default VideoPlayback;
