'use strict';

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Feature = require('../models/Feature');
const cleanRow = require('../util').cleanRow;

// Make an external API call and post data to db
router.post('/new', (req, res, next) => {
  return fetch('https://data.seattle.gov/api/views/j9km-ydkc/rows.json')
    .then(res => res.json())
    .then(json => {
      const rows = json.data;
      let entries = {};
      rows.forEach((row) => {
        let entry = {};
        entry['name'] = cleanRow(row[10]);
        entries[entry['name']] = entry;
      })
      const data = Object.values(entries);
      Feature.insertMany(data, (err) => {
      if (err)
        return res.status(500)
                  .send(err);
      res.status(200)
         .send(`Created ${data.length} features.`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get all the features from db, sorted by name asc
router.get('/', (req, res) => {
  Feature.find({})
    .sort({name: 'asc'})
    .exec((err, features) => {
      if (err)
        return res.status(500)
                  .send(err);
      res.status(200)
         .send(features);
  });
});
// Delete features by id or all
router.delete('/:id', (req, res) => {
  if (req.params.id == 'all') {
    Feature.remove({}, (err, feature) => {
      if (err)
        return res.status(500)
                  .send(err)
      res.status(200)
         .send(`All features are deleted from db.`)
    });
  } else {
    Feature.findByIdAndRemove(req.params.id, (err, feature) => {
      if (err)
        return res.status(500)
                  .send('There was a problem finding the feature.')
      else if(!feature)
        return res.status(404)
                  .send('feature not found.');
      res.status(200)
         .send(`${feature.name}–${feature.feature} was deleted.`)
    });
  }
});

module.exports = router;
