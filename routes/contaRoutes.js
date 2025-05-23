const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');

router.get('/conta', contaController.listarContas);
router.get('/contaSaldo', contaController.contaSaldo);
router.post('/conta', contaController.Insertconta);
router.delete('/conta/:id', contaController.deletarConta);
router.put('/conta/:id', contaController.editarConta);

module.exports = router;
