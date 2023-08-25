const express = require('express');
const router = express.Router();
const formsController = require('../controllers/formsController');

router.get('/',formsController.index);


module.exports = router;