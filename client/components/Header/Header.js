import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Sun } from '~/components';

export const Header = ({
  alerts,
  currentZip,
  setCurrentZip,
  setUseMetric,
  useMetric,
}) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Set the input to display the current zip code if one exists
    if (currentZip) {
      setInputText(currentZip);
    }
  }, [currentZip]);

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
        <form onSubmit={handleSubmit} className="Header-form">
          <div className="Header-inputWrap">
            <label htmlFor="zip-input">Enter Zip:</label>
            <input
              type="text"
              onChange={handleInput}
              placeholder="Search by ZIP"
              id="zip-input"
              value={inputText}
            />
          </div>
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
  currentZip: PropTypes.string,
  setCurrentZip: PropTypes.func.isRequired,
  setUseMetric: PropTypes.func.isRequired,
  useMetric: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  alerts: [],
  currentZip: null,
};
