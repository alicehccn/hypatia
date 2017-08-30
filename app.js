'use strict';

const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./UserController');
app.use('/users', UserController);

module.exports = app;