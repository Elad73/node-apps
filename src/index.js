const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('./db/mongoose');
const keys = require('../config/keys');

// exports for weather app
const geocode = require('./utils/geocode');
const {forcastByCity, forcastByCoord} = require('./utils/forcast');

// exports for tasks app
const User = require('./models/user');
const Task = require('./models/task');

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

app.use(express.json());


// #region weather routes
app.get('', (req, res) => {
    res.render('index', {
        title: "Portfolio",
        authorName: 'Elad Ron'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        authorName: 'Elad Ron'
    });
});



app.get('/notes', (req, res) => {
    res.render('notes', {
        title: "Notes",
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

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: "Weather",
        authorName: 'Elad Ron'
    });
});

app.get('/forecast', (req, res)=>{
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


// #endregion

//#region tasks routes

app.get('/users', (req, res) => {
    User.find({}).then( (users) => {
        res.send(users);
    }).catch( (e) => {
        res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then( (user) => {
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch( (e) => {
        res.status(500).send(e);
    });
});

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then( ()=> {
        res.status(201).send(user);
    }).catch( (e)=> {
        res.status(400).send(e);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then( (tasks) => {
        res.send(tasks);
    }).catch( (e) => {
        res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then( (task) => {
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch( (e) => {
        res.status(500).send(e);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then( ()=> {
        res.status(201).send(task);
    }).catch( (e)=> {
        res.status(400).send(e);
    });
});

//#endregion

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



