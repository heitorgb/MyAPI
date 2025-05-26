const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.post('/doc', docController.criarDoc);
router.get('/doc',autenticarToken, docController.listarDocs);
router.get('/doc/receitas',autenticarToken, docController.listarDocsReceitas);
router.get('/doc/despesas',autenticarToken, docController.listarDocsDespesas);
router.delete('/doc/:id',autenticarToken, docController.deletarDoc);
router.delete('/doc',autenticarToken, docController.deletarTodos);

module.exports = router;
