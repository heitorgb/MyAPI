const express = require('express');
const router = express.Router();
const naturezaController = require('../controllers/naturezaController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.get('/natureza', naturezaController.ListarNatureza);
router.get('/natureza/receita', naturezaController.ListarNaturezaRec);
router.get('/natureza/despesa', naturezaController.ListarNaturezaDep);

module.exports = router;