const { query } = require("express");
const pool = require ("../providers/conexion");

async function serviceExisteFactura(nit_factura) {
    try {
        const resultadoExiste = await pool.query("SELECT COUNT(*) AS count FROM FACTURA WHERE EMPRESA_NIT = ?", [nit_factura]);
        return resultadoExiste.rows[0].count > 0;
    } catch (error) {
        console.error("Error al verificar si existe la factura:", error);
        return null; // Indicar un error en caso de que falle la consulta
    }
}

// Registra una nueva factura en la base de datos
async function serviceRegistrarFactura(fecha_compra, hora_compra, nit, id_cliente, id_empleado, id_metodo_pago, total_valor, id_tipo_movimiento) {
    try {
        await pool.query("INSERT INTO FACTURA (FECHA_COMPRA, HORA_COMPRA, EMPRESA_NIT, CLIENTES_ID_CLIENTES, EMPLEADOS_ID_EMPLEADO, METODOS_DE_PAGO_ID_METODO, TOTAL_VALOR, TIPO_MOVIMIENTO_ID_MOVIMIENTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [fecha_compra, hora_compra, nit, id_cliente, id_empleado, id_metodo_pago, total_valor, id_tipo_movimiento]);
        return 0; // La inserción fue exitosa
    } catch (error) {
        console.error("Error al registrar la factura:", error);
        return null; // Indicar un error en caso de que falle la inserción
    }
}

// Busca una factura por su ID en la base de datos
async function serviceBuscarFactura(id_factura) {
    try {
        const resultado = await pool.query("SELECT * FROM FACTURA WHERE ID_FACTURA = ?", [id_factura]);
        return resultado.rows.length > 0 ? resultado.rows[0] : null; // Retorna la primera factura encontrada, si existe
    } catch (error) {
        console.error("Error al buscar la factura:", error);
        return null; // Indicar un error en caso de que falle la búsqueda
    }
}

// Obtiene el total de una factura por su ID en la base de datos
async function serviceTotalFactura(id_factura) {
    try {
        const resultado = await pool.query("SELECT TOTAL_VALOR FROM FACTURA WHERE ID_FACTURA = ?", [id_factura]);
        return resultado.rows.length > 0 ? resultado.rows[0].TOTAL_VALOR : null; // Retorna el total de la factura, si existe
    } catch (error) {
        console.error("Error al obtener el total de la factura:", error);
        return null; // Indicar un error en caso de que falle la consulta
    }
}

module.exports = {
    serviceExisteFactura,
    serviceRegistrarFactura,
    serviceBuscarFactura,
    serviceTotalFactura
};