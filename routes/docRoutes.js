const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.post('/doc',autenticarToken, docController.criarDoc);
router.get('/doc/:id',autenticarToken, docController.listarDocs);
router.get('/docAnual/:id',autenticarToken, docController.listarDocsAnual);
router.get('/doc/receitas',autenticarToken, docController.listarDocsReceitas);
router.get('/doc/despesas',autenticarToken, docController.listarDocsDespesas);
router.get('/doc/despesas/:id',autenticarToken, docController.listarDocsDespesasUser);
router.get('/doc/receitas/:id',autenticarToken, docController.listarDocsReceitasUser);
router.delete('/doc/:id',autenticarToken, docController.deletarDoc);
router.delete('/doc',autenticarToken, docController.deletarTodos);

module.exports = router;
