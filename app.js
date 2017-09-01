'use strict';

const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./controllers/UserController');
const ParkController = require('./controllers/ParkController');
const FeatureController = require('./controllers/FeatureController');

app.use('/users', UserController);
app.use('/parks', ParkController);
app.use('/features', FeatureController);

module.exports = app;