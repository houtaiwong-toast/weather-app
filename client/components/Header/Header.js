import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Sun } from '~/components';

export const Header = ({
  alerts,
  setCurrentZip,
  setUseMetric,
  useMetric,
}) => {
  const [inputText, setInputText] = useState('');

  const handleInput = e => {
    setInputText(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setCurrentZip(inputText);
  };
  const toggleTempUnits = () => {
    setUseMetric(!useMetric);
  };

  return (
    <div className="Header">
      <div className="Header-content">
        <div className="Header-titleWrap">
          <div className="Header-logo">
            <Sun />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="Header-inputWrap">
          <input type="text" onChange={handleInput} />
          <button type="submit">Search</button>
        </form>
        <div className="Header-tempToggleWrap">
          <button onClick={toggleTempUnits} disabled={useMetric}>
            °C
          </button>
          <button onClick={toggleTempUnits} disabled={!useMetric}>
            °F
          </button>
        </div>
      </div>

      <div className="Header-alerts">
        {alerts.length > 0 &&
          alerts.map((alert, i) => {
            const alertParts = alert.description
              ? alert.description.split('...')
              : [];
            return (
              <Alert
                key={`${alert.start}-${alert.end}-${i}`}
                event={alert.event}
                fullText={alertParts[2]}
                sender={alert.sender_name}
                summary={alertParts[1]}
              />
            );
          })}
      </div>
    </div>
  );
};

Header.propTypes = {
  alerts: PropTypes.array,
  currentWeather: PropTypes.object,
  location: PropTypes.string,
  setCurrentZip: PropTypes.func.isRequired,
  setUseMetric: PropTypes.func.isRequired,
  useMetric: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  alerts: [],
  currentWeather: {},
  location: null,
};
