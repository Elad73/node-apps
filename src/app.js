const path = require('path');
const express = require('express');
const hbs = require('hbs');

const keys = require('../config/keys');
const geocode = require('./utils/geocode');
const {forcastByCity, forcastByCoord} = require('./utils/forcast');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        authorName: 'Elad Ron'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        authorName: 'Elad Ron'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        msg: "How can I assist?",
        authorName: 'Elad Ron'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Bad turn...",
        imgSrc: "/img/help404.png",
        authorName: 'Elad Ron'
    });
});

app.get('/weather', (req, res)=>{
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

       
    



app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        imgSrc: "/img/404.jpg",
        authorName: 'Elad Ron'
    });
});



app.listen(keys.expressPort, ()=>{
    console.log('Server is up on port '+ keys.expressPort);
});


