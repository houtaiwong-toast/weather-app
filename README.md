# Weather App

## App details
* Displays current weather & 8-day forecast
  * Current weather includes: Current temp, feels like, condition, humidity, wind, and dew point
  * Forecast includes: High/low temps, condition, and wind
* Allows users to search by ZIP for local weather
* Loads user's location by IP on page load

02116)
* Displays city, state, and country for the selected location
* Displays current weather alerts, if any are in effect
* Able to toggle between metric & imperial units
* Responsive

## Tech
### API
* Node & Express server
* Uses `serverless-http` and `netlify-lambda` to translate Express server to lambda functions for better support on Netlify
* Fetches weather data from https://open-meteo.com/ public API
* Fetches location data (city, state, country) using https://ipapi.co/json and http://api.zippopotam.us

### UI
* React
* React Router
* Sass
* Fetches user location by IP via https://ipapi.co/
### General
* Gulp:
  * Linting (eslint)
  * JS minification
  * Sass compiling
* Babel
* Node v18+
* Yarn 1.22.1