const globals = require('../globals');
const geocode = require('./utils/geocode');
const {forcastByCity, forcastByCoord} = require('./utils/forcast');


forcastByCity('petah tikva israel', (error,data) => {
    console.log('Error:' + error);
    console.log('Data: ' + JSON.stringify(data));
})

forcastByCoord(32.08333, 34.88333, (error,data) => {
    console.log('Error:' + error);
    console.log('Data: ' + JSON.stringify(data));
})


// geocode( 'petah tikva', (error, data) => {
//     console.log('Error:' + error);
//     console.log('Data: ' + JSON.stringify(data));
// });


