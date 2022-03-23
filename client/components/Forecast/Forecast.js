import React from 'react';
import PropTypes from 'prop-types';

export const Forecast = ({ forecast }) => {
  console.log(forecast);
  return <div>Forecast</div>;
};

Forecast.propTypes = {
  forecast: PropTypes.object,
};
