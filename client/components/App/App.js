import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Forecast, Header, Weather } from '~/components';

export const App = () => {
  const [currentZip, setCurrentZip] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [useMetric, setUseMetric] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const { zipCode } = useParams();

  // Load default zipcode for the page
  useEffect(() => {
    // Use the /:zipCode param if provided by the user
    if (!currentZip && zipCode) {
      setCurrentZip(zipCode);
    } else if (!currentZip) {
      // If no zip is provided, look up their zip based on IP
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(data => {
          const { zip } = data;
          setError(null);
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
    if (currentZip) {
      fetch(`/.netlify/functions/server/weather/${currentZip}`, {
        method: 'POST',
      })
        .then(res => res.json())
        .then(data => {
          setWeatherData(data.weather);
          setLocation(data.location);
          setError(null);
        })
        .catch(err => {
          console.log(err);
          setError('There was an error loading the weather data');
        });
    }
  }, [currentZip]);

  const currentWeather = weatherData?.current;

  return (
    <div className="App">
      <Header
        alerts={weatherData?.alerts}
        currentWeather={currentWeather}
        location={location || currentZip}
        setCurrentZip={setCurrentZip}
        setUseMetric={setUseMetric}
        useMetric={useMetric}
      />
      <main className="App-main">
        <div className="App-content">
          {error && <p className="App-error">Error - {error}</p>}
          {!error && weatherData && (
            <>
              <Weather
                location={location || currentZip}
                useMetric={useMetric}
                weatherData={currentWeather}
              />
              <Forecast
                forecast={weatherData?.daily}
                useMetric={useMetric}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};
