const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.get('/contas/:id', autenticarToken,contaController.listarContas);
router.get('/conta/:id', autenticarToken,contaController.listarContasUser);
router.get('/contaSaldo/:id', autenticarToken,contaController.contaSaldo);
router.post('/conta', autenticarToken,contaController.Insertconta);
router.delete('/conta/:id', autenticarToken,contaController.deletarConta);
router.put('/conta/:id', autenticarToken,contaController.editarConta);
router.get('/contaid/:id', autenticarToken,contaController.listarContasId);

module.exports = router;
