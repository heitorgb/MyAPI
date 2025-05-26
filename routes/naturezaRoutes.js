const express = require('express');
const router = express.Router();
const naturezaController = require('../controllers/naturezaController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.get('/natureza', naturezaController.ListarNatureza);

module.exports = router;