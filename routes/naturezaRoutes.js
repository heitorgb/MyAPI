const express = require('express');
const router = express.Router();
const naturezaController = require('../controllers/naturezaController');

router.get('/natureza', naturezaController.ListarNatureza);

module.exports = router;