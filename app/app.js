const express = require('express');
const router = require('../router/router'); 
const app = express();

//Static site middleware
app.use(express.static('public'));

// For accepting post from data
app.use(express.urlencoded({ extended: true }));

// static directories
app.use(express.static('public'));
app.use(express.static('views'));


// Router
app.use('/', router);

module.exports = app;