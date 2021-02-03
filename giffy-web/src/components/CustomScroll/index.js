import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

const CustomScrollBars = ({ id, style, children, className }) => (
  <Scrollbars
    id={id}
    className={className}
    style={style}
    autoHide
    autoHideTimeout={1000}
    autoHideDuration={200}
    // autoHeight
    autoHeightMin={0}
    autoHeightMax={200}
    thumbMinSize={30}
    universal
  >
    {children}
  </Scrollbars>
);

CustomScrollBars.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default CustomScrollBars;
