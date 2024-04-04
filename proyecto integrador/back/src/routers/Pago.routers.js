const express = require("express");
const router = express.Router();
const pagoControllers = require('../controllers/Pago.controllers');

router.post('/registrar', pagoControllers.registrarPago);
router.get('/:id_pago', pagoControllers.buscarPagoPorId);

module.exports = router;
