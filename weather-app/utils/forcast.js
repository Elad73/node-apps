const request = require('request');
const keys = require('../../config/keys');

const serviceUrl = "http://api.weatherstack.com/current?access_key=" + keys.weatherStackKey;

const forcastRequest = (url, callback) => {
    request({url: url, json:true}, (error, response) => {
        if(error) {
            callback("Unable to connect to weather services!", undefined);
        } else if(response.body.error) {
            callback("Unable to find location!", undefined);
        }
        else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                desc: response.body.current.weather_descriptions[0],
                feelslike: response.body.current.feelslike
            });
        }
    });
}

//ToDo: improve the error handling without hard code
const forcastByCity = (city, callback) => {
    const url = serviceUrl + "&query=" + city;
    forcastRequest(url, callback);
}

const forcastByCoord = (latitude, longitude, callback) => {
    const url = serviceUrl + "&query=" + latitude + "," + longitude;
    forcastRequest(url, callback);
}

module.exports = {forcastByCity, forcastByCoord};