const express = require("express");
const router = express.Router();
const notaControllers = require('../controllers/NotaDeCredito.controllers');

router.post('/registrar', notaControllers.registrarNota);
router.get('/:id_nota', notaControllers.buscarNotaPorId);

module.exports = router;
