'use strict';

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Park = require('../models/Park');
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
        const name = cleanRow(row[9]);
        entry['slug'] = name.toLowerCase().replace(/[^0-9a-z]+/gi, '-'); 
        entry['name'] = name;
        entry['hours'] = cleanRow(row[11]);
        entry['latitude'] = cleanRow(row[12]);
        entry['longitude'] = cleanRow(row[13]);
        entries[entry['slug']] = entry;
      })
      const data = Object.values(entries);
      Park.insertMany(data, (err, parks) => {
      if (err)
        return res.status(500)
                  .send(err);
      res.status(200)
         .send(`Created ${data.length} parks.`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get all the parks from db, sorted by name asc
router.get('/', (req, res) => {
  Park.find({})
    .sort({name: 'asc'})
    .exec((err, parks) => {
      if (err)
        return res.status(500)
                  .send(err);
      res.status(200)
         .send(parks);
  });
});

// Get park by id or name
router.get('/:slug', (req, res) => {
  Park.find({slug: req.params.slug}, (err, park) => {
    if (err)
      return res.status(500)
                .send(err);
    res.status(200)
       .send(park);
  });
});

// Delete parks by id or all
router.delete('/:id', (req, res) => {
  if (req.params.id == 'all') {
    Park.remove({}, (err, park) => {
      if (err)
        return res.status(500)
                  .send(err)
      res.status(200)
         .send(`All parks are deleted from db.`)
    });
  } else {
    Park.findByIdAndRemove(req.params.id, (err, park) => {
      if (err)
        return res.status(500)
                  .send('There was a problem finding the park.')
      else if(!park)
        return res.status(404)
                  .send('Park not found.');
      res.status(200)
         .send(`${park.name}–${park.feature} was deleted.`)
    });
  }
});

module.exports = router;
