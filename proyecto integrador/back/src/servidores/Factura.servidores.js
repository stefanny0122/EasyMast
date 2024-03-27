const { query } = require("express");
const pool = require ("../providers/conexion");

async function serviceExisteFactura(nit_factura) {
    try {
        const resultadoExiste = await pool.query("SELECT COUNT(*) AS count FROM FACTURA WHERE EASYMATS_NIT = $1", [nit_factura]);
        return resultadoExiste.rows[0].count > 0;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function serviceRegistrarFactura(fecha_compra, hora_compra, nit, id_cliente, id_empleado, id_metodo_pago, total_valor, id_tipo_movimiento) {
    try {
        // Realizar la inserción de la factura en la base de datos
        await pool.query("INSERT INTO FACTURA (FECHA_COMPRA, HORA_COMPRA, EASYMATS_NIT, CLIENTES_ID_CLIENTES, EMPLEADOS_ID_EMPLEADO, METODOS_DE_PAGO_ID_METODO, TOTAL_VALOR, TIPO_MOVIMIENTO_ID_MOVIMIENTO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [fecha_compra, hora_compra, nit, id_cliente, id_empleado, id_metodo_pago, total_valor, id_tipo_movimiento]);

        // La inserción fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al registrar la factura:", error);
        return null; // Indicar un error en caso de que falle la inserción
    }
}

async function serviceBuscarFactura(id_factura) {
    try {
        // Realizar la búsqueda de la factura en la base de datos
        const resultado = await pool.query("SELECT * FROM FACTURA WHERE ID_FACTURA = $1", [id_factura]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró la factura con el ID proporcionado
            return resultado.rows[0];
        } else {
            // No se encontró ninguna factura con el ID proporcionado
            return null;
        }
    } catch (error) {
        console.error("Error al buscar la factura:", error);
        return null; // Indicar un error en caso de que falle la búsqueda
    }
}

async function serviceTotalFactura(id_factura) {
    try {
        // Realizar la consulta para obtener el total de la factura en la base de datos
        const resultado = await pool.query("SELECT TOTAL_VALOR FROM FACTURA WHERE ID_FACTURA = $1", [id_factura]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró la factura con el ID proporcionado
            return resultado.rows[0].TOTAL_VALOR;
        } else {
            // No se encontró ninguna factura con el ID proporcionado
            return null;
        }
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