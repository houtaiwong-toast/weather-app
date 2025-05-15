import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/./../.env' });

const app = express();
const router = express.Router();

router.post('/weather/:zip', async (req, res) => {
  const { zip } = req.params;
  try {
    // Get location data from zip code using Zippopotam.us
    const locationResponse = await fetch(`http://api.zippopotam.us/us/${zip}`);
    if (!locationResponse.ok) {
      throw new Error('Invalid ZIP code');
    }
    const locationData = await locationResponse.json();
    const { places } = locationData;
    const place = places[0]; // Get the first place for this ZIP code
    
    const location = `${place['place name']}, ${place['state abbreviation']}`;
    const { latitude: lat, longitude: lon } = place;

    // Get weather using Open-Meteo API
    const weather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,wind_direction_10m,dew_point_2m&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit`
    );

    const weatherJson = await weather.json();
    
    res.json({ 
      weather: weatherJson, 
      location: location 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error with your request');
  }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/.netlify/functions/server', router); // path must route to lambda

export const handler = serverless(app);
export default app;
