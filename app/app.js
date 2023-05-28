const express = require('express');
const router = require('../router/router'); 
const bodyParser = require('body-parser');
const app = express();

//Static site middleware
app.use(express.static('public'));
app.use(express.static('views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// Router
app.use('/', router);


module.exports = app;