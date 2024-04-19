const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//Chamada mestre de todos os trouxas
router.get('/', usuarioController.obterTodosUsuarios);

//Cria um novo trouxa 
router.post('/', usuarioController.criarUsuario);

//atualiza um trouxa existente
router.put('/:id', usuarioController.atualizarUsuario);

//some com um trouxa existente 
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
