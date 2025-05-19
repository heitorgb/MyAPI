const express = require('express');
const router = express.Router();
const tcController = require('../controllers/tcController');

router.get('/tc', tcController.listarTCs);
router.post('/tc', tcController.InsertTC);
router.delete('/tc/:id', tcController.deletarTC);
router.put('/tc/:id', tcController.editarTC);

module.exports = router;
