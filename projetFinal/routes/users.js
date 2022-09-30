var express = require('express');
var router = express.Router();

const Produit = require('../models/produit');
const { default: mongoose, mongo } = require('mongoose');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
