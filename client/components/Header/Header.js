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
  const [error, setError] = useState('');

  useEffect(() => {
    // Set the input to display the current zip code if one exists
    if (currentZip) {
      setInputText(currentZip);
    }
  }, [currentZip]);

  const validateZipCode = (zip) => {
    // US ZIP codes are 5 digits
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
  };

  const handleInput = e => {
    setInputText(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateZipCode(inputText)) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }
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
              maxLength="5"
            />
          </div>
          <button type="submit">Search</button>
        </form>
        {error && <div className="Header-error">{error}</div>}
        <div className="Header-tempToggleWrap">
          <button onClick={toggleTempUnits} disabled={useMetric}>
            °C
          </button>
          <button onClick={toggleTempUnits} disabled={!useMetric}>
            °F
          </button>
        </div>
      </div>
      {alerts && alerts.length > 0 && <Alert alerts={alerts} />}
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
