'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:sophiebella@ds163613.mlab.com:63613/hypatia', { useMongoClient: true });
