const path = require('path');
const express = require('express');
const keys = require('../../config/keys');

const app = express();
const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

app.get('/weather', (req, res)=>{
    res.send({
        "forcast": "sunny",
        "location": 34
    });
});


app.listen(keys.expressPort, ()=>{
    console.log('Server is up on port '+ keys.expressPort);
});


