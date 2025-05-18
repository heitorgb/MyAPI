const express = require('express');
const router = express.Router();
const tcController = require('../controllers/tcController');

router.get('/tc', tcController.listarTCs);

module.exports = router;
