const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.get('/conta' ,contaController.listarContas);
router.get('/contaSaldo', autenticarToken,contaController.contaSaldo);
router.post('/conta', autenticarToken,contaController.Insertconta);
router.delete('/conta/:id', autenticarToken,contaController.deletarConta);
router.put('/conta/:id', autenticarToken,contaController.editarConta);

module.exports = router;
