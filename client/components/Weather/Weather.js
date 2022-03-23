import React from 'react';
import PropTypes from 'prop-types';
import { WeatherIcon } from '~/components';
import {
  convertKelvin,
  convertToMph,
  convertUnixTimestamp,
  getRelativeTemp,
} from '~/utils';

export const Weather = ({ location, useMetric, weatherData }) => {
  console.log(weatherData);
  const tempColor = getRelativeTemp(weatherData.temp);
  const feelColor = getRelativeTemp(weatherData.feels_like);

  const sunrise = convertUnixTimestamp(weatherData.sunrise);
  const sunset = convertUnixTimestamp(weatherData.sunset);

  return (
    <section className="Weather">
      <h1 className="Weather-location">{location}</h1>
      <div className="Weather-sun">
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
      </div>
      <div className="Weather-content">
        <div className="Weather-iconWrap">
          <WeatherIcon icon={weatherData.weather[0]?.icon} size={4} />
        </div>
        <div className="Weather-tempWrap">
          <p className={`Weather-temp ${tempColor}`}>
            {convertKelvin(weatherData.temp, useMetric)}
          </p>
          <p>
            Feels like:{' '}
            <span className={`${feelColor}`}>
              {convertKelvin(weatherData.feels_like, useMetric)}
            </span>
          </p>
        </div>
        <div className="Weather-details">
          <dl>
            <dt>Condition:</dt>
            <dd>{weatherData.weather[0].main}</dd>
            <dt>Humidity:</dt>
            <dd>{weatherData.humidity}%</dd>
            <dt>Wind Speed:</dt>
            <dd>{convertToMph(weatherData.wind_speed, useMetric)}</dd>
            <dt>Dew Point: </dt>
            <dd>{convertKelvin(weatherData.dew_point, useMetric)}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
};

Weather.propTypes = {
  location: PropTypes.string,
  useMetric: PropTypes.bool.isRequired,
  weatherData: PropTypes.object,
};

Weather.defaultProps = {
  location: null,
  weatherData: {},
};
