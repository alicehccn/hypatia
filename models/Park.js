'use strict';

const mongoose = require('mongoose');
const ParkSchema = new mongoose.Schema({
  slug: { type : String, required : true, unique: true, dropDups : true },
  name: { type: String, required: true },
  hours: String,
  latitude: String,
  longitude: String
});
mongoose.model('Park', ParkSchema);

module.exports = mongoose.model('Park');
