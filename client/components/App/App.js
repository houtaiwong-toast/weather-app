import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Weather } from '~/components';

export const App = () => {
  const [currentZip, setCurrentZip] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const { zipCode } = useParams();

  // Load default zipcode for the page
  useEffect(() => {
    // Use the /:zipCode param if provided by the user
    if (!currentZip && zipCode) {
      setCurrentZip(zipCode);
    } else if (!currentZip) {
      // If no zip is provided, look up their zip based on IP
      fetch('/location', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          const { city, countryCode, region, zip } = data;
          setError(null);
          setLocation(`${city}, ${region} ${countryCode}`);
          setCurrentZip(zip);
        })
        .catch(err => {
          console.log(err);
          // Not using setError to store the message here
          // We don't want an error with the zip lookup to block the page
        });
    }
  }, []); // eslint-ignore-line - Only run on initial page load

  // Load the weather data if we have a new zip code
  useEffect(() => {
    if (currentZip && !weatherData) {
      fetch(`/weather/${currentZip}`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          setWeatherData(data);
          setError(null);
        })
        .catch(err => {
          console.log(err);
          setError('There was an error loading the weather data');
        });
    }
  }, [currentZip]);

  return (
    <div className="App">
      <Header location={location} zip={currentZip} />
      {error ? (
        <p className="App-error">Error - {error}</p>
      ) : (
        <Weather weatherData={weatherData} />
      )}
    </div>
  );
};
