const { query } = require("express");
const pool = require ("../providers/conexion");

// Función para verificar si existe un material en la base de datos
async function serviceExisteMaterial(nombre_producto) {
    try {
        const resultadoExiste = await pool.query("SELECT COUNT(*) AS count FROM PRODUCTO WHERE NOMBRE_PRODUCTO = ?", [nombre_producto]);
        return resultadoExiste.rows[0].count > 0;
    } catch (error) {
        console.error("Error al verificar la existencia del material:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}
// Función para obtener todos los materiales de la base de datos
async function serviceObtenerTodosLosMateriales() {
    try {
        // Realizar la búsqueda de todos los materiales en la base de datos
        const resultado = await pool.query("SELECT * FROM PRODUCTO");

        if (resultado.rows.length > 0) {
            // Se encontraron materiales en la base de datos
            return resultado.rows;
        } else {
            // No se encontraron materiales en la base de datos
            return [];
        }
    } catch (error) {
        console.error("Error al obtener todos los materiales:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

// Función para registrar un nuevo material en la base de datos
async function serviceRegistrarMaterial(id_producto, nombre_producto, descripcion, precio, id_proveedor) {
    try {
        const materialExiste = await serviceExisteMaterial(nombre_producto);

        if (materialExiste) {
            // El material ya existe en la base de datos
            return 1;
        } else {
            // El material no existe, proceder con el registro
            await pool.query("INSERT INTO PRODUCTO (ID_PRODUCTO, NOMBRE_PRODUCTO, DESCRIPCION, PRECIO, PROVEEDORES_ID_PROVEEDOR) VALUES (?, ?, ?, ?, ?)", [id_producto, nombre_producto, descripcion, precio, id_proveedor]);
            return 0; // Indicar que el material se registró correctamente
        }
    } catch (error) {
        console.error("Error al registrar el material:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

// Función para actualizar un material en la base de datos
async function serviceActualizarMaterial(id_producto, nombre_producto, descripcion, precio, id_proveedor) {
    try {
        // Realizar la actualización del material en la base de datos
        const resultado = await pool.query("UPDATE PRODUCTO SET NOMBRE_PRODUCTO = ?, DESCRIPCION = ?, PRECIO = ?, PROVEEDORES_ID_PROVEEDOR = ? WHERE ID_PRODUCTO = ?", [nombre_producto, descripcion, precio, id_proveedor, id_producto]);

        if (resultado.affectedRows > 0) {
            // La actualización fue exitosa
            return 0;
        } else {
            // No se encontró el material para actualizar
            return 1;
        }
    } catch (error) {
        console.error("Error al actualizar el material:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

// Función para buscar un material por su nombre en la base de datos
async function serviceBuscarMaterial(nombre_producto) {
    try {
        // Realizar la búsqueda del material en la base de datos
        const resultado = await pool.query("SELECT * FROM PRODUCTO WHERE NOMBRE_PRODUCTO = ?", [nombre_producto]);

        if (resultado.rows.length > 0) {
            // Se encontraron materiales con el nombre proporcionado
            return resultado.rows;
        } else {
            // No se encontraron materiales con el nombre proporcionado
            return null;
        }
    } catch (error) {
        console.error("Error al buscar el material:", error);
        throw error; // Lanzar el error para que sea manejado en niveles superiores
    }
}

module.exports = {
    serviceExisteMaterial,
    serviceRegistrarMaterial,
    serviceActualizarMaterial,
    serviceBuscarMaterial,
    serviceObtenerTodosLosMateriales 
};
