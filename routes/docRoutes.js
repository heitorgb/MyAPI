const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');

router.post('/doc', docController.criarDoc);
router.get('/doc', docController.listarDocs);
router.delete('/doc/:id', docController.deletarDoc);
router.delete('/doc', docController.deletarTodos);

module.exports = router;
