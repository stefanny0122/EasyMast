const facturaServices = require("../servidores/Factura.servidores.js");

// Controlador para verificar si una factura existe
exports.verificarExistenciaFactura = async (req, res) => {
    const { nit_factura } = req.body;
    const existeFactura = await facturaServices.serviceExisteFactura(nit_factura);
    
    if (existeFactura === null) {
        return res.status(500).json({ error: "Error al verificar la existencia de la factura" });
    }

    res.status(200).json({ existe: existeFactura });
};

// Controlador para registrar una nueva factura
exports.registrarFactura = async (req, res) => {
    const { fecha_compra, hora_compra, nit, id_cliente, id_empleado, id_metodo_pago, total_valor, id_tipo_movimiento } = req.body;

    const resultado = await facturaServices.serviceRegistrarFactura(
        fecha_compra, hora_compra, nit, id_cliente, id_empleado, id_metodo_pago, total_valor, id_tipo_movimiento
    );

    if (resultado === null) {
        return res.status(500).json({ error: "Error al registrar la factura" });
    }

    res.status(201).json({ message: "Factura registrada exitosamente" });
};

// Controlador para buscar una factura por su ID
exports.buscarFacturaPorId = async (req, res) => {
    const { id_factura } = req.params;

    const factura = await facturaServices.serviceBuscarFactura(id_factura);
    
    if (!factura) {
        return res.status(404).json({ error: "Factura no encontrada" });
    }

    res.status(200).json(factura);
};

// Controlador para obtener el total de una factura por su ID
exports.obtenerTotalFactura = async (req, res) => {
    const { id_factura } = req.params;

    const total = await facturaServices.serviceTotalFactura(id_factura);

    if (total === null) {
        return res.status(500).json({ error: "Error al obtener el total de la factura" });
    }

    res.status(200).json({ total });
};
