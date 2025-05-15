"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _serverlessHttp = _interopRequireDefault(require("serverless-http"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config({
  path: __dirname + '/./../.env'
});

var app = (0, _express["default"])();

var router = _express["default"].Router();

router.post('/weather/:zip', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var zip, locationResponse, locationData, places, place, location, lat, lon, weather, weatherJson;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            zip = req.params.zip;
            _context.prev = 1;
            _context.next = 4;
            return (0, _nodeFetch["default"])("http://api.zippopotam.us/us/".concat(zip));

          case 4:
            locationResponse = _context.sent;

            if (locationResponse.ok) {
              _context.next = 7;
              break;
            }

            throw new Error('Invalid ZIP code');

          case 7:
            _context.next = 9;
            return locationResponse.json();

          case 9:
            locationData = _context.sent;
            places = locationData.places;
            place = places[0]; // Get the first place for this ZIP code

            location = "".concat(place['place name'], ", ").concat(place['state abbreviation']);
            lat = place.latitude, lon = place.longitude; // Get weather using Open-Meteo API

            _context.next = 16;
            return (0, _nodeFetch["default"])("https://api.open-meteo.com/v1/forecast?latitude=".concat(lat, "&longitude=").concat(lon, "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,wind_direction_10m,dew_point_2m&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit"));

          case 16:
            weather = _context.sent;
            _context.next = 19;
            return weather.json();

          case 19:
            weatherJson = _context.sent;
            res.json({
              weather: weatherJson,
              location: location
            });
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).send('There was an error with your request');

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use(_bodyParser["default"].json());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '/../public/')));
app.use('/.netlify/functions/server', router); // path must route to lambda

var handler = (0, _serverlessHttp["default"])(app);
exports.handler = handler;
var _default = app;
exports["default"] = _default;