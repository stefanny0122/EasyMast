const { query } = require("express");
const pool = require ("../providers/conexion");

async function serviceRegistrarPagos(id_metodo, nombre_metodo, descripcion) {
    try {
        // Realizar la inserción del método de pago en la base de datos
        await pool.query("INSERT INTO METODOS_DE_PAGO (ID_METODO, NOMBRE_METODO, DESCRIPCION) VALUES (?, ?, ?)", [id_metodo, nombre_metodo, descripcion]);
        
        // La inserción fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al registrar el método de pago:", error);
        return null; // Indicar un error en caso de que falle la inserción
    }
}

async function serviceBuscarPago(id_pago) {
    try {
        // Realizar la búsqueda del pago en la base de datos
        const resultado = await pool.query("SELECT * FROM PAGOS WHERE ID_PAGO = ?", [id_pago]);
        
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