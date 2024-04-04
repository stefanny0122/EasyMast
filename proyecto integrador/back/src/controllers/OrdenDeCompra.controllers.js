const carritoServices = require("../servidores/OrdenDeCompra.servidores.js");

// Controlador para registrar una orden en el carrito de compras
exports.registrarOrden = async (req, res) => {
    const { id_factura, id_producto, cantidad, subtotal } = req.body;
    try {
        await carritoServices.serviceRegistrarOrden(id_factura, id_producto, cantidad, subtotal);
        res.status(201).json({ message: "Orden registrada en el carrito de compras exitosamente" });
    } catch (error) {
        console.error("Error al registrar la orden en el carrito:", error);
        res.status(500).json({ error: "Error al registrar la orden en el carrito" });
    }
};

// Controlador para actualizar una orden en el carrito de compras
exports.actualizarOrden = async (req, res) => {
    const { id_factura, id_producto, cantidad, subtotal } = req.body;
    try {
        await carritoServices.serviceActualizarOrden(id_factura, id_producto, cantidad, subtotal);
        res.status(200).json({ message: "Orden en el carrito de compras actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar la orden en el carrito:", error);
        res.status(500).json({ error: "Error al actualizar la orden en el carrito" });
    }
};

// Controlador para buscar una orden en el carrito de compras
exports.buscarOrden = async (req, res) => {
    const { id_factura, id_producto } = req.params;
    try {
        const orden = await carritoServices.serviceBuscarOrden(id_factura, id_producto);
        if (orden === null) {
            res.status(404).json({ error: "No se encontró la orden en el carrito de compras" });
        } else {
            res.status(200).json(orden);
        }
    } catch (error) {
        console.error("Error al buscar la orden en el carrito:", error);
        res.status(500).json({ error: "Error al buscar la orden en el carrito" });
    }
};

// Controlador para calcular el subtotal de una orden en el carrito de compras
exports.calcularSubtotal = async (req, res) => {
    const { id_factura } = req.params;
    try {
        const subtotal = await carritoServices.serviceCalcularSubtotal(id_factura);
        if (subtotal === null) {
            res.status(404).json({ error: "No se encontró la orden en el carrito de compras" });
        } else {
            res.status(200).json({ subtotal });
        }
    } catch (error) {
        console.error("Error al calcular el subtotal de la orden en el carrito:", error);
        res.status(500).json({ error: "Error al calcular el subtotal de la orden en el carrito" });
    }
};
