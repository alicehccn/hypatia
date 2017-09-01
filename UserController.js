'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// router.use(bodyParser.urlencoded({ extended: true }))
// router.use(bodyParser.json());

const User = require('./User');

// Create a new user
router.post('/', (req, res) => {
  User.create({
    name: req.query.name,
    email: req.query.email,
    password: req.query.password
  },
  (err, user) => {
    if (err)
      return res.status(500)
                // .send('There was a problem adding the entry to the database.');
                .send(err.message);
    res.status(200)
       .send(user);
  });
});

// Get all the users from db
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      return res.status(500)
                .send('There was a problem finding the users.');
    res.status(200)
       .send(users);
  });
});

// Get a single user by id
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      return res.status(500)
                .send('There was a problem finding the user.')
    else if(!user)
      return res.status(404)
                .send('User not found.');
    res.status(200)
       .send(user)
  });
});

// Delete a user by id
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err)
      return res.status(500)
                .send('There was a problem finding the user.')
    else if(!user)
      return res.status(404)
                .send('User not found.');
    res.status(200)
       .send(`User ${user.name} was deleted.`)
  });
});

// Find and update a user
router.put('/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.query, {new: true}, function (err, user) {
    if (err) 
      return res.status(500)
                .send("There was a problem updating the user.");
    res.status(200).send(user);
  });
});


module.exports = router;