const request = require('request');
const keys = require('../config/keys');

const globals = require('../globals');

const url = "http://api.weatherstack.com/current?access_key=" + keys.weatherStackKey + "&query=Tel Aviv";

request({ url: url } , (error, response)=> {
    //globals.log(response);
    const data = JSON.parse(response.body);
    globals.log(data.current);
    globals.log(data.location);
});