const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const autenticarToken = require('../src/middleware/authMiddleware');

router.get('/catReceita',autenticarToken , categoriaController.listarCategoriaReceita);
router.get('/catDespesa',autenticarToken , categoriaController.listarCategoriaDespesa);
router.post('/catInsert',autenticarToken , categoriaController.InsertCategoria);
router.delete('/cat/:id',autenticarToken , categoriaController.deletarCategoria);
router.put('/cat/:id',autenticarToken , categoriaController.editarCategoria);


module.exports = router;
