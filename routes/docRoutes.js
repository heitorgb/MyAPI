const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.post('/doc',autenticarToken, docController.criarDoc);
router.get('/doc',autenticarToken, docController.listarDocs);
router.delete('/doc/:id',autenticarToken, docController.deletarDoc);
router.delete('/doc',autenticarToken, docController.deletarTodos);
router.get('/doc/totaldeb',autenticarToken, docController.totalDocsDeb);
router.get('/doc/totalcred',autenticarToken, docController.totalDocsCred);

module.exports = router;
