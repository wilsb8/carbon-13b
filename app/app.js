const express = require('express');
const router = require('../router/router'); 
const bodyParser = require('body-parser');
const app = express();

//Static site middleware
app.use(express.static('public'));
app.use(express.static('views'));

// For accepting post from data
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())




// Router
app.use('/', router);


module.exports = app;