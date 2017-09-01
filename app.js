'use strict';

const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./controllers/UserController');
const ParkController = require('./controllers/ParkController');

app.use('/users', UserController);
app.use('/parks', ParkController);

module.exports = app;