const request = require('request');
const keys = require('../config/keys');

const globals = require('../globals');

const urlWeather = "http://api.weatherstack.com/current?access_key=" + keys.weatherStackKey + "&query=Tel Aviv";

// request({ url: urlWeather, json: true } , (error, response)=> {
//     globals.log("It is currently " + globals.warning(response.body.current.temperature) + " degress out.");
//     globals.log("The weather is " + globals.warning(response.body.current.weather_descriptions[0]) + ".");
//     globals.log("It feels like " + globals.warning(response.body.current.feelslike) + " degrees out there!");
// });

const urlGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places/Tel Aviv.json?limit=1&access_token=" + keys.mapBoxKey;
request({url: urlGeo, json:true}, (error, response) => {
    globals.log(globals.warning(response.body.features[0].place_name));
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    globals.log("Location: latitude - " + globals.warning(latitude) + ", longitude - " + globals.warning(longitude) + ".");

});