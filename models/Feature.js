'use strict';

const mongoose = require('mongoose');
const FeatureSchema = new mongoose.Schema({
  parks: { type: Array, required: true },
  name: { type: String, required: true }
});
mongoose.model('Feature', FeatureSchema);

module.exports = mongoose.model('Feature');
