const { query } = require("express");
const pool = require ("../providers/conexion");
const pool = require("../providers/conexion");

// Función para registrar una orden en el carrito de compras
async function serviceRegistrarOrden(id_factura, id_producto, cantidad, subtotal) {
    try {
        // Realizar la inserción de la orden en la tabla CARRITO
        await pool.query("INSERT INTO CARRITO (FACTURA_ID_FACTURA, PRODUCTO_ID_PRODUCTO, CANTIDAD, SUBTOTAL) VALUES (?, ?, ?, ?)", [id_factura, id_producto, cantidad, subtotal]);
        
        // La inserción fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al registrar la orden en el carrito:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

// Función para actualizar una orden en el carrito de compras
async function serviceActualizarOrden(id_factura, id_producto, cantidad, subtotal) {
    try {
        // Realizar la actualización de la orden en la tabla CARRITO
        await pool.query("UPDATE CARRITO SET CANTIDAD = ?, SUBTOTAL = ? WHERE FACTURA_ID_FACTURA = ? AND PRODUCTO_ID_PRODUCTO = ?", [cantidad, subtotal, id_factura, id_producto]);
        
        // La actualización fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al actualizar la orden en el carrito:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

// Función para buscar una orden en el carrito de compras
async function serviceBuscarOrden(id_factura, id_producto) {
    try {
        // Realizar la búsqueda de la orden en la tabla CARRITO
        const resultado = await pool.query("SELECT * FROM CARRITO WHERE FACTURA_ID_FACTURA = ? AND PRODUCTO_ID_PRODUCTO = ?", [id_factura, id_producto]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró la orden en el carrito
            return resultado.rows[0];
        } else {
            // No se encontró la orden en el carrito
            return null;
        }
    } catch (error) {
        console.error("Error al buscar la orden en el carrito:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

// Función para calcular el subtotal de una orden en el carrito de compras
async function serviceCalcularSubtotal(id_factura) {
    try {
        // Realizar el cálculo del subtotal de la orden en la tabla CARRITO
        const resultado = await pool.query("SELECT SUM(SUBTOTAL) AS subtotal FROM CARRITO WHERE FACTURA_ID_FACTURA = ?", [id_factura]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró el subtotal de la orden en el carrito
            return resultado.rows[0].subtotal;
        } else {
            // No se encontró la orden en el carrito
            return null;
        }
    } catch (error) {
        console.error("Error al calcular el subtotal de la orden en el carrito:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

module.exports = {
    serviceRegistrarOrden,
    serviceActualizarOrden,
    serviceBuscarOrden,
    serviceCalcularSubtotal
};
