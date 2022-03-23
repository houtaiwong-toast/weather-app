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
    var zip, location, locationJson, formatted_address, coords, coordsJson, lat, lon, weather, weatherJson;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            zip = req.params.zip;
            _context.prev = 1;
            _context.next = 4;
            return (0, _nodeFetch["default"])("".concat(process.env.MAPS_API, "?address=").concat(zip, "&key=").concat(process.env.MAPS_API_KEY));

          case 4:
            location = _context.sent;
            _context.next = 7;
            return location.json();

          case 7:
            locationJson = _context.sent;
            formatted_address = locationJson.results[0].formatted_address; // Get latitude & longitude by zip code

            _context.next = 11;
            return (0, _nodeFetch["default"])("".concat(process.env.ZIP_API, "?zip=").concat(zip, "&appid=").concat(process.env.API_KEY));

          case 11:
            coords = _context.sent;
            _context.next = 14;
            return coords.json();

          case 14:
            coordsJson = _context.sent;
            lat = coordsJson.lat, lon = coordsJson.lon; // Get weather using lat & lon coordinates

            _context.next = 18;
            return (0, _nodeFetch["default"])("".concat(process.env.WEATHER_API, "?lat=").concat(lat, "&lon=").concat(lon, "&appid=").concat(process.env.API_KEY));

          case 18:
            weather = _context.sent;
            _context.next = 21;
            return weather.json();

          case 21:
            weatherJson = _context.sent;
            res.json({
              weather: weatherJson,
              location: formatted_address
            });
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).send('There was an error with your request');

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 25]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Find location data from IP address

router.post('/location', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var apiResponse, json, city, countryCode, region, zip;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _nodeFetch["default"])('http://ip-api.com/json');

          case 3:
            apiResponse = _context2.sent;
            _context2.next = 6;
            return apiResponse.json();

          case 6:
            json = _context2.sent;
            city = json.city, countryCode = json.countryCode, region = json.region, zip = json.zip;
            res.json({
              city: city,
              countryCode: countryCode,
              region: region,
              zip: zip
            });
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(500).send('Something went wrong');

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.use(_bodyParser["default"].json());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '/../public/')));
app.get('/*', function (req, res) {
  return res.sendFile(_path["default"].join(__dirname, '/../public/', 'index.html'));
});
var handler = (0, _serverlessHttp["default"])(app);
exports.handler = handler;
var _default = app;
exports["default"] = _default;