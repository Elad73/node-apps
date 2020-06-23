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
    geocode( location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error);
        }

        forcastByCoord(latitude, longitude, (error,forcastData) => {
            if (error) {
                return console.log(error);
            }
        
            console.log(location);
            console.log(forcastData);
        })
    });
}


