const { query } = require("express");
const pool = require ("../providers/conexion");

async function serviceRegistrarNota(id_nota, descripcion) {
    try {
        // Realizar la inserción de la nota en la base de datos
        await pool.query("INSERT INTO TIPO_MOVIMIENTO (ID_MOVIMIENTO, DESCRIPCION) VALUES (?, ?)", [id_nota, descripcion]);
        
        // La inserción fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al registrar la nota:", error);
        return null; // Indicar un error en caso de que falle la inserción
    }
}

async function serviceBuscarNota(id_nota) {
    try {
        // Realizar la búsqueda de la nota en la base de datos
        const resultado = await pool.query("SELECT * FROM TIPO_MOVIMIENTO WHERE ID_MOVIMIENTO = ?", [id_nota]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró la nota con el ID proporcionado
            return resultado.rows[0];
        } else {
            // No se encontró ninguna nota con el ID proporcionado
            return null;
        }
    } catch (error) {
        console.error("Error al buscar la nota:", error);
        return null; // Indicar un error en caso de que falle la búsqueda
    }
}

module.exports = {
    serviceRegistrarNota,
    serviceBuscarNota
};