const express = require('express');
const keys = require('../../config/keys');

const app = express();

app.get('', (req, res)=>{
    res.send('Hellp express!');
});

app.get('/help', (req, res)=>{
    res.send('Help page.');
});

app.get('/about', (req, res)=>{
    res.send('About page.');
});


app.get('/weather', (req, res)=>{
    res.send('Weather page.');
});



app.listen(keys.expressPort, ()=>{
    console.log('Server is up on port '+ keys.expressPort);
});

