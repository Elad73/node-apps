const express = require('express');
const geocode = require('../utils/geocode');
const {forcastByCity, forcastByCoord} = require('../utils/forcast');

const router = new express.Router();

router.get('/forecast', (req, res)=>{
    if(!(req.query.city || req.query.location)) {
        return res.send({
            error: 'You need to specify either city or location for getting a forcast.'
        });
    }

    const location = req.query.city || req.query.location;

    geocode( location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forcastByCoord(latitude, longitude, (error,forcastData) => {
            if (error) {
                return res.send({ error });
            }
        
            return res.send({
                location,
                forcast: forcastData
            });
        })
    });
});

module.exports = router;