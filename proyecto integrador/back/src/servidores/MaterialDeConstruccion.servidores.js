const { query } = require("express");
const pool = require ("../providers/conexion");

async function serviceExisteMaterial(nombre_producto) {
    try {
        const resultadoExiste = await pool.query("SELECT COUNT(*) AS count FROM PRODUCTO WHERE NOMBRE_PRODUCTO = $1", [nombre_producto]);
        return resultadoExiste.rows[0].count > 0;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function serviceRegistrarMaterial(id_producto, nombre_producto, descripcion, precio, id_proveedor) {
    try {
        const materialExiste = await serviceExisteMaterial(nombre_producto);

        if (materialExiste) {
            // El material ya existe en la base de datos
            return 1;
        } else {
            // Material no existe, proceder con el registro
            await pool.query("INSERT INTO PRODUCTO (ID_PRODUCTO, NOMBRE_PRODUCTO, DESCRIPCION, PRECIO, PROVEEDORES_ID_PROVEEDOR) VALUES ($1, $2, $3, $4, $5)", [id_producto, nombre_producto, descripcion, precio, id_proveedor]);
            return 0; // Indicar que el material se registró correctamente
        }
    } catch (error) {
        console.error(error);
        return null; // Indicar un error en caso de que falle la inserción o la verificación de existencia del material
    }
}

async function serviceActualizarMaterial(id_producto, nombre_producto, descripcion, precio, id_proveedor) {
    try {
        // Verificar si el material existe antes de actualizarlo (opcional)
        const materialExiste = await serviceExisteMaterial(nombre_producto);
        
        // Realizar la actualización del material en la base de datos
        const resultado = await pool.query("UPDATE PRODUCTO SET NOMBRE_PRODUCTO = $2, DESCRIPCION = $3, PRECIO = $4, PROVEEDORES_ID_PROVEEDOR = $5 WHERE ID_PRODUCTO = $1", [id_producto, nombre_producto, descripcion, precio, id_proveedor]);
        
        // Verificar si la actualización tuvo éxito
        if (resultado.affectedRows > 0) {
            // La actualización fue exitosa
            return 0;
        } else {
            // No se encontró el material para actualizar
            return 1;
        }
    } catch (error) {
        console.error("Error al actualizar el material:", error);
        return null; // Indicar un error en caso de que falle la actualización
    }
}

async function serviceBuscarMaterial(nombre_producto) {
    try {
        // Realizar la búsqueda del material en la base de datos
        const resultado = await pool.query("SELECT * FROM PRODUCTO WHERE NOMBRE_PRODUCTO = $1", [nombre_producto]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontraron materiales con el nombre proporcionado
            return resultado.rows;
        } else {
            // No se encontraron materiales con el nombre proporcionado
            return null;
        }
    } catch (error) {
        console.error("Error al buscar el material:", error);
        return null; // Indicar un error en caso de que falle la búsqueda
    }
}


module.exports = {
 serviceExisteMaterial,
 serviceRegistrarMaterial,
 serviceActualizarMaterial,
 serviceBuscarMaterial
};
