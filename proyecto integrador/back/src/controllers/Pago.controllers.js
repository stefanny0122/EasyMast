const pagoServices = require("../servidores/Pago.servidores.js");

// Controlador para registrar un método de pago
exports.registrarPago = async (req, res) => {
    const { id_metodo, nombre_metodo, descripcion } = req.body;
    try {
        const resultado = await pagoServices.serviceRegistrarPagos(id_metodo, nombre_metodo, descripcion);
        
        if (resultado === 0) {
            res.status(201).json({ message: "Método de pago registrado exitosamente" });
        } else {
            res.status(500).json({ error: "Error al registrar el método de pago" });
        }
    } catch (error) {
        console.error("Error al registrar el método de pago:", error);
        res.status(500).json({ error: "Error al registrar el método de pago" });
    }
};

// Controlador para buscar un pago por su ID
exports.buscarPagoPorId = async (req, res) => {
    const { id_pago } = req.params;
    try {
        const pago = await pagoServices.serviceBuscarPago(id_pago);
        
        if (pago === null) {
            res.status(404).json({ error: "No se encontró el pago" });
        } else {
            res.status(200).json(pago);
        }
    } catch (error) {
        console.error("Error al buscar el pago:", error);
        res.status(500).json({ error: "Error al buscar el pago" });
    }
};
