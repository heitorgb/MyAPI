const express = require('express');
const router = express.Router();
const contaTipoController = require('../controllers/contaTipoController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.get('/contaTipo',autenticarToken , contaTipoController.ListarTipoConta);

module.exports = router;