import React from 'react';
import PropTypes from 'prop-types';

export const Weather = ({ weatherData }) => {
  console.log(weatherData);
  return <div></div>;
};

Weather.propTypes = {
  weatherData: PropTypes.object,
};

Weather.defaultProps = {
  weatherData: {},
};
