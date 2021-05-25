'strict'

const express = require('express');
const router = express.Router();
// import config file
const passport = require('../config/ppConfig');
const db = require('../models');

router.get('/stocks/newStock',(req, res) =>{
    res.render('/stocks/newStock');
});

app.use('/stocks', require('./controllers/stocks'));

module.exports = router;
