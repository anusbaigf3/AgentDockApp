import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>{text}</p>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string
};

export default Loading;