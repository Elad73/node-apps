const request = require('request');
const keys = require('../../../config/keys');

//ToDo: improve the error handling without hard code
const geocode = (address, callback) => {
    const urlGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=" + keys.mapBoxKey;

    request({url: urlGeo, json:true}, (error, { body } = {}) => {
        if(error) {
            callback("Unable to connect to location services!", undefined);
        } else if(body.message == "Not Found") {
            callback("Unable to find location! Try another search.", undefined);
        } else if(body.features.length === 0) {
            callback("Unable to find location! Try another search.", undefined);
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
}

module.exports = geocode;