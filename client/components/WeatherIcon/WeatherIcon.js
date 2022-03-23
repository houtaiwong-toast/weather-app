import React from 'react';
import PropTypes from 'prop-types';

export const WeatherIcon = ({ alt, icon, size }) => (
  <img
    src={`http://openweathermap.org/img/wn/${icon}${
      size ? `@${size}x` : ''
    }.png`}
    alt={alt || ''}
  />
);

WeatherIcon.propTypes = {
  alt: PropTypes.string,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf([2, 4]),
};

WeatherIcon.defaultProps = {
  alt: null,
  size: null,
};
