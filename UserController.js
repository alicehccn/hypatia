'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

const User = require('./User');

// Create a new user
router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  },
  (err, user) => {
    if (err)
      return req.status(500)
                .send('There was a problem adding the entry to the database.');
    res.status(200)
       .send(user);
  });
});

// Return all the users in the database
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      return res.status(500)
                .send('There was a problem finding the users.');
    res.status(200)
       .send(users);
  });
});



module.exports = router;