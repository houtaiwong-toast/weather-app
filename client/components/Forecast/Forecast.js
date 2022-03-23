import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'title-case';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { WeatherIcon } from '~/components';
import {
  convertKelvin,
  convertToMph,
  convertUnixTimestamp,
  degToCompass,
  getRelativeTemp,
} from '~/utils';

export const Forecast = ({ forecast }) => {
  console.log(forecast);
  return (
    <section className="Forecast-wrapper">
      {forecast.map(day => {
        const { date } = convertUnixTimestamp(day.dt);
        const { max, min } = day.temp;
        const maxFeel = getRelativeTemp(max);
        const minFeel = getRelativeTemp(min);
        const currentWeather = day.weather[0];
        return (
          <dl key={day.dt} className="Forecast">
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
                      {convertKelvin(max)}
                    </span>
                    <span className={`Forecast-min ${minFeel}`}>
                      {convertKelvin(min)}
                    </span>
                  </dd>
                </div>
                <div className="Forecast-weather">
                  <dt className="sr-only">Weather Conditions</dt>
                  <dd className="Forecast-iconBlock">
                    <WeatherIcon
                      icon={currentWeather.icon}
                      size={2}
                    />
                    <span>
                      {titleCase(currentWeather.description)}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Wind</dt>
                  <dd className="Forecast-iconBlock">
                    <FontAwesomeIcon icon={faWind} />
                    <span>
                      {convertToMph(day.wind_speed)}{' '}
                      {degToCompass(day.wind_deg)}
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
  forecast: PropTypes.array,
};
