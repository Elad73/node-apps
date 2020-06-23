const request = require('request');
const keys = require('../../config/keys');

const serviceUrl = "http://api.weatherstack.com/current?access_key=" + keys.weatherStackKey;

//ToDo: improve the error handling without hard code
const forcastByCity = (city, callback) => {
    const url = serviceUrl + "&query=" + city;

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

const forcastByCoord = (latitude, longitude, callback) => {
    const url = serviceUrl + "&query=" + latitude + "," + longitude;

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

module.exports = {forcastByCity, forcastByCoord};