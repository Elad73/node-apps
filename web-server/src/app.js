const path = require('path');
const express = require('express');
const keys = require('../../config/keys');

const app = express();
const publicDirPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: 'Elad Ron'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: 'Elad Ron'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        msg: "How can I assist?",
        name: 'Elad Ron'
    });
});


app.get('/weather', (req, res)=>{
    res.send({
        "forcast": "sunny",
        "location": 34
    });
});


app.listen(keys.expressPort, ()=>{
    console.log('Server is up on port '+ keys.expressPort);
});


