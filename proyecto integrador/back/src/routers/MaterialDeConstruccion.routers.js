const express = require("express");
const router = express.Router();
const materialControllers = require('../controllers/MaterialDeConstruccion.controllers');

router.post('/verificar-existencia', materialControllers.verificarExistenciaMaterial);
router.post('/registrar', materialControllers.registrarMaterial);
router.put('/actualizar', materialControllers.actualizarMaterial);
router.get('/:nombre_producto', materialControllers.buscarMaterialPorNombre);

module.exports = router;
