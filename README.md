# Weather App

## App details
* Displays current weather & 8-day forecast
  * Current weather includes: Current temp, feels like, condition, humidity, wind, and dew point
  * Forecast includes: High/low temps, condition, and wind
* Allows users to search by ZIP for local weather
* Deployed via Netlify: https://sleach-weather.netlify.app/
* Loads user's location by IP on page load
* Can also use a `/<zip>` route to load any location via url (ex: https://sleach-weather.netlify.app/02116)
* Able to toggle between metric & imperial units
* Responsive

## Tech
### API
* Node & Express server
* Uses `serverless-http` to translate Express server to lambda functions for better support on Netlify
### UI
* React
* React Router
* Sass
### General
* Gulp:
  * Linting (eslint)
  * JS minification
  * Sass compiling
* Babel
