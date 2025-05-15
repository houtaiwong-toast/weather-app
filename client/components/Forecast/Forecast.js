import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'title-case';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import WMOJSON from '~/utils/json/WMO.json';

import {
  convertMetric,
  convertToMph,
  convertUnixTimestamp,
  degToCompass,
  getRelativeTemp,
} from '~/utils';

export const Forecast = ({ forecast, useMetric }) => {
  return (
    <section className="Forecast-wrapper">
      {[...Array(7)].map((_, index) => {
        const date = convertUnixTimestamp(forecast.daily.time[index]).date;
        const max = forecast.daily.temperature_2m_max[index];
        const min = forecast.daily.temperature_2m_min[index];
        const maxFeel = getRelativeTemp(max);
        const minFeel = getRelativeTemp(min);
        const currentWeather = forecast.daily.weather_code[0]
        return (
          <dl key={index} className="Forecast">
            <dt>
              <span className="sr-only">Date:</span>
              {date}
            </dt>
            <dd>
              <dl className="Forecast-conditions">
                <div>
                  <dt className="sr-only">Temperature</dt>
                  <dd>
                    <span className={`Forecast-max ${maxFeel}`}>
                      {convertMetric(max, useMetric)}
                    </span>
                    <span className={`Forecast-min ${minFeel}`}>
                      {convertMetric(min, useMetric)}
                    </span>
                  </dd>
                </div>
                <div className="Forecast-weather">
                  <dt className="sr-only">Weather Conditions</dt>
                  <dd className="Forecast-iconBlock">
                    <img
                      src={WMOJSON[currentWeather].day.image}
                      alt={WMOJSON[currentWeather].day.description}
                    />
                    <span>
                      {titleCase(WMOJSON[currentWeather].day.description)}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Wind</dt>
                  <dd className="Forecast-iconBlock">
                    <FontAwesomeIcon icon={faWind} />
                    <span>
                      {convertToMph(forecast.daily.wind_speed_10m_max[index], useMetric)}{' '}
                      {degToCompass(forecast.daily.wind_direction_10m_dominant[index], useMetric)}
                    </span>
                  </dd>
                </div>
              </dl>
            </dd>
          </dl>
        );
      })}
    </section>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.object,
  useMetric: PropTypes.bool,
};

Forecast.defaultProps = {
  foreCast: {},
  useMetric: false,
};
