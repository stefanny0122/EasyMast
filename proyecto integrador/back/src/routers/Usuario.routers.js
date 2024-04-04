const express = require("express");
const router = express.Router();
const usuarioControllers = require('../controllers/Usuario.controllers');

router.post('/registrar', usuarioControllers.registrarUsuario);
router.put('/:tipoUsuario/:idUsuario', usuarioControllers.actualizarUsuario);
router.get('/:tipoUsuario/:idUsuario', usuarioControllers.buscarUsuarioPorId);
router.put('/:tipoUsuario/:idUsuario/estado', usuarioControllers.cambiarEstadoUsuario);
router.get('/:tipoUsuario/:idUsuario/estado', usuarioControllers.estadoDeUsuario);
router.post('/autenticar', usuarioControllers.autenticarUsuario);

module.exports = router;
