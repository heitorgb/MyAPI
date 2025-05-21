const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/logins', loginController.listarlogin);
router.post('/auth/register', loginController.cadastrarlogin);
router.post('/auth/login', loginController.validarLogin);
module.exports = router;

