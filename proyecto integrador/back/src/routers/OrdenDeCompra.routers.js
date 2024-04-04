const express = require("express");
const router = express.Router();
const carritoControllers = require('../controllers/OrdenDeCompra.controllers');

router.post('/registrar', carritoControllers.registrarOrden);
router.put('/actualizar', carritoControllers.actualizarOrden);
router.get('/:id_factura/:id_producto', carritoControllers.buscarOrden);
router.get('/:id_factura/subtotal', carritoControllers.calcularSubtotal);

module.exports = router;
