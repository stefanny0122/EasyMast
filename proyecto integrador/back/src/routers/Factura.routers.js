const express = require("express");
const router = express.Router();
const facturaControllers = require('../controllers/Factura.controllers');

router.post('/verificar-existencia', facturaControllers.verificarExistenciaFactura);
router.post('/registrar', facturaControllers.registrarFactura);
router.get('/:id_factura', facturaControllers.buscarFacturaPorId);
router.get('/:id_factura/total', facturaControllers.obtenerTotalFactura);

module.exports = router;
