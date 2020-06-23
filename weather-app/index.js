const request = require('request');
const keys = require('../config/keys');

const globals = require('../globals');

const url = "http://api.weatherstack.com/current?access_key=" + keys.weatherStackKey + "&query=Tel Aviv";

request({ url: url, json: true } , (error, response)=> {
    globals.log("It is currently " + globals.warning(response.body.current.temperature) + " degress out.");
    globals.log("The weather is " + globals.warning(response.body.current.weather_descriptions));
    globals.log("It feels like " + globals.warning(response.body.current.feelslike) + " degrees out there!");
});