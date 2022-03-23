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
    // Get location data from zip code
    const mapsApi = `${process.env.MAPS_API}?address=${zip}&key=${process.env.MAPS_API_KEY}`;
    const location = await fetch(mapsApi);
    const locationJson = await location.json();
    const { formatted_address } = locationJson.results[0];
    // Get latitude & longitude by zip code
    const coords = await fetch(
      `${process.env.ZIP_API}?zip=${zip}&appid=${process.env.API_KEY}`
    );
    const coordsJson = await coords.json();
    const { lat, lon } = coordsJson;
    // Get weather using lat & lon coordinates
    const weather = await fetch(
      `${process.env.WEATHER_API}?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
    );
    const weatherJson = await weather.json();
    res.json({ weather: weatherJson, location: formatted_address });
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
