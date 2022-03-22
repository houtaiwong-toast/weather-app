const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config({ path: __dirname + '/./../.env' });

const app = express();

app.use(express.static(path.join(__dirname, '/../static')));
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/../static', 'index.html'))
);

app.post('/weather/:zip', async (req, res) => {
  const { zip } = req.params;
  try {
    // Get latitude & longitude by zip code
    const response = await fetch(
      `${process.env.ZIP_API}?zip=${zip}&appid=${process.env.API_KEY}`
    );
    const coordsJson = await response.json();
    const { lat, lon } = coordsJson;
    // Get weather using lat & lon coordinates
    const weather = await fetch(
      `${process.env.WEATHER_API}?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
    );
    const weatherJson = await weather.json();
    res.json(weatherJson);
  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error with your request');
  }
});

// Find location data from IP address
app.post('/location', async (req, res) => {
  try {
    const apiResponse = await fetch('http://ip-api.com/json');
    const json = await apiResponse.json();
    const { city, countryCode, region, zip } = json;
    res.json({ city, countryCode, region, zip });
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

app.listen(3000, () => {
  console.log(`Server started listening on 3000`);
});
