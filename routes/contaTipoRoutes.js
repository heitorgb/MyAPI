const express = require('express');
const router = express.Router();
const contaTipoController = require('../controllers/contaTipoController');

router.get('/contaTipo', contaTipoController.ListarTipoConta);

module.exports = router;