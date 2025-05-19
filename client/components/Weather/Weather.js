import React from 'react';
import PropTypes from 'prop-types';
import {
  convertMetric,
  convertToMph,
  convertUnixTimestamp,
  degToCompass,
  getRelativeTemp,
} from '~/utils';
import WMOJSON from '~/utils/json/WMO.json';

export const Weather = ({ location, useMetric, weatherData }) => {
  const tempColor = getRelativeTemp(weatherData.temp);
  const feelColor = getRelativeTemp(weatherData.feels_like);

  const { time: sunrise } = convertUnixTimestamp(weatherData.daily.sunrise[0]);
  const { time: sunset } = convertUnixTimestamp(weatherData.daily.sunset[0]);

  return (
    <section className="Weather">
      <h1 className="Weather-location">{location}</h1>
      <div className="Weather-sun">
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
      </div>
      <div className="Weather-content">
        <div className="Weather-iconWrap">
          <img
            src={WMOJSON[weatherData.current.weather_code].day.image}
            alt={WMOJSON[weatherData.current.weather_code].day.description}
          />
        </div>
        <div className="Weather-tempWrap">
          <p className={`Weather-temp ${tempColor}`}>
            {convertMetric(weatherData.current.temperature_2m, useMetric)}
          </p>
          <p>
            Feels like:{' '}
            <span className={`${feelColor}`}>
              {convertMetric(weatherData.current.apparent_temperature, useMetric)}
            </span>
          </p>
        </div>
        <div className="Weather-details">
          <dl>
            <dt>Condition:</dt>
            <dd>{weatherData.current.weather_code}</dd>
            <dt>Humidity:</dt>
            <dd>{weatherData.current.relative_humidity_2m}%</dd>
            <dt>Wind Speed:</dt>
            <dd>
              {convertToMph(weatherData.current.wind_speed_10m, useMetric)}{' '}
              {degToCompass(weatherData.current.wind_direction_10m)}
            </dd>
            <dt>Dew Point: </dt>
            <dd>{convertMetric(weatherData.current.dew_point_2m, useMetric)}</dd>
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
