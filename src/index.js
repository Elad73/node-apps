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

// Getting users function with promise syntax
// app.get('/users', (req, res) => {
//     User.find({}).then( (users) => {
//         res.send(users);
//     }).catch( (e) => {
//         res.status(500).send();
//     });
// });

// Getting users function with an async/await syntax
app.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
});

// Getting a user function with promise syntax
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id;

//     User.findById(_id).then( (user) => {
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     }).catch( (e) => {
//         res.status(500).send(e);
//     });
// });

// Getting a user function an async/await syntax
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        console.log('This is the user from the asynch await: ' + user);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Creating user function with promise syntax
// app.post('/users', (req, res) => {
//     const user = new User(req.body);

//     user.save().then( ()=> {
//         res.status(201).send(user);
//     }).catch( (e)=> {
//         res.status(400).send(e);
//     });
// });

// Creating user function with an async/await syntax
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body); //extracting the keys of the body json from the request
    const allowedUpdates = ['name', 'email', 'password', 'age']; // this is an array of all of the keys that allowed to be updated
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) ); //passing on each key and comaring it to the allowed array, if there is a key that does not exist return false.

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tasks', async (req, res) => {
   
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send();
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body); //extracting the keys of the body json from the request
    const allowedUpdates = ['description', 'completion']; // this is an array of all of the keys that allowed to be updated
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) ); //passing on each key and comaring it to the allowed array, if there is a key that does not exist return false.

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
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



