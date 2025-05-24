const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/catReceita', categoriaController.listarCategoriaReceita);
router.get('/catDespesa', categoriaController.listarCategoriaDespesa);
router.post('/catInsert', categoriaController.InsertCategoria);
router.delete('/cat/:id', categoriaController.deletarCategoria);
router.put('/cat/:id', categoriaController.editarCategoria);

module.exports = router;
