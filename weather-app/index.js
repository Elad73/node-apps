const globals = require('../globals');
const geocode = require('./utils/geocode');
const {forcastByCity, forcastByCoord} = require('./utils/forcast');

// forcastByCity('petah tikva israel', (error,data) => {
//     console.log('Error:' + error);
//     console.log('Data: ' + JSON.stringify(data));
// })

const location =process.argv[2];
if (!location) {
    globals.log(globals.error("Please provide location!"));
} else {
    geocode( location, (error, locationData) => {
        if (error) {
            return console.log(error);
        }

        forcastByCoord(locationData.latitude, locationData.longitude, (error,forcastData) => {
            if (error) {
                return console.log(error);
            }
        
            console.log(locationData.location);
            console.log(forcastData);
        })
    });
}


