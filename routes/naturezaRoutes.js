const express = require('express');
const router = express.Router();
const naturezaController = require('../controllers/naturezaController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.get('/natureza', autenticarToken,naturezaController.ListarNatureza);
router.get('/natureza/receita',autenticarToken, naturezaController.ListarNaturezaRec);
router.get('/natureza/despesa',autenticarToken, naturezaController.ListarNaturezaDep);

module.exports = router;