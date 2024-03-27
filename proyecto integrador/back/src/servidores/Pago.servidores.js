const { query } = require("express");
const pool = require ("../providers/conexion");

async function serviceRegistrarPagos(id_factura, fecha_pago, monto_pago) {
    try {
        // Realizar la inserción del pago en la base de datos
        await pool.query("INSERT INTO PAGOS (ID_FACTURA, FECHA_PAGO, MONTO_PAGO) VALUES ($1, $2, $3)", [id_factura, fecha_pago, monto_pago]);
        
        // La inserción fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al registrar el pago:", error);
        return null; // Indicar un error en caso de que falle la inserción
    }
}

async function serviceBuscarPago(id_pago) {
    try {
        // Realizar la búsqueda del pago en la base de datos
        const resultado = await pool.query("SELECT * FROM PAGOS WHERE ID_PAGO = $1", [id_pago]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró el pago con el ID proporcionado
            return resultado.rows[0];
        } else {
            // No se encontró ningún pago con el ID proporcionado
            return null;
        }
    } catch (error) {
        console.error("Error al buscar el pago:", error);
        return null; // Indicar un error en caso de que falle la búsqueda
    }
}

module.exports = {
    serviceRegistrarPagos,
    serviceBuscarPago
   };