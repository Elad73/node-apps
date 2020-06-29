
//prod.js - production keys here!!!
module.exports = {
    weatherStackKey: process.env.WEATHERSTACK_KEY,
    mapBoxKey:       process.env.MAPBOX_KEY,
    expressPort:     process.env.PORT,
    sendGridKey:     process.env.SEND_GRID_KEY,
    mongodbConStr:   process.env.MONGODB_CON_STR,
    jwtSecret:       process.env.JWT_SECRET
  };
  
