const { query } = require("express");
const pool = require ("../providers/conexion");

async function serviceRegistrarOrden(id_factura, nit_easyMats, id_cliente, id_producto, id_proveedor) {
    try {
        // Realizar la inserción de la orden en la tabla FACTURA_has_PRODUCTO
        await pool.query("INSERT INTO FACTURA_has_PRODUCTO (FACTURA_ID_FACTURA, FACTURA_EASYMATS_NIT, FACTURA_CLIENTES_ID_CLIENTES, PRODUCTO_ID_PRODUCTO, PRODUCTO_PROVEEDORES_ID_PROVEEDOR) VALUES ($1, $2, $3, $4, $5)", [id_factura, nit_easyMats, id_cliente, id_producto, id_proveedor]);
        
        // La inserción fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al registrar la orden:", error);
        return null; // Indicar un error en caso de que falle la inserción
    }
}

async function serviceActualizarOrden(id_factura, nit_easyMats, id_cliente, id_producto, id_proveedor) {
    try {
        // Realizar la actualización de la orden en la tabla FACTURA_has_PRODUCTO
        await pool.query("UPDATE FACTURA_has_PRODUCTO SET PRODUCTO_ID_PRODUCTO = $1, PRODUCTO_PROVEEDORES_ID_PROVEEDOR = $2 WHERE FACTURA_ID_FACTURA = $3 AND FACTURA_EASYMATS_NIT = $4 AND FACTURA_CLIENTES_ID_CLIENTES = $5", [id_producto, id_proveedor, id_factura, nit_easyMats, id_cliente]);
        
        // La actualización fue exitosa
        return 0;
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        return null; // Indicar un error en caso de que falle la actualización
    }
}

async function serviceBuscarOrden(id_factura, nit_easyMats, id_cliente) {
    try {
        // Realizar la búsqueda de la orden en la tabla FACTURA_has_PRODUCTO
        const resultado = await pool.query("SELECT * FROM FACTURA_has_PRODUCTO WHERE FACTURA_ID_FACTURA = $1 AND FACTURA_EASYMATS_NIT = $2 AND FACTURA_CLIENTES_ID_CLIENTES = $3", [id_factura, nit_easyMats, id_cliente]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró la orden
            return resultado.rows[0];
        } else {
            // No se encontró la orden
            return null;
        }
    } catch (error) {
        console.error("Error al buscar la orden:", error);
        return null; // Indicar un error en caso de que falle la búsqueda
    }
}

async function serviceAsignarEstadoOrden(id_factura, nit_easyMats, id_cliente) {
    try {
        // Verificar si la orden existe en la tabla FACTURA_has_PRODUCTO
        const ordenExiste = await serviceBuscarOrden(id_factura, nit_easyMats, id_cliente);

        if (ordenExiste !== null) {
            // La orden existe, verificar si el producto asociado está presente en la base de datos
            const productoExiste = await serviceExisteProducto(ordenExiste.PRODUCTO_ID_PRODUCTO, ordenExiste.PRODUCTO_PROVEEDORES_ID_PROVEEDOR);
            
            // Determinar el estado a asignar
            const estado = productoExiste ? 'activo' : 'inactivo';

            // No hay una variable de estado específica en la tabla, pero podríamos asumir el estado de la orden
            // Por ejemplo, podríamos imprimir el estado en la consola para propósitos de visualización
            console.log(`La orden con ID ${id_factura} está ${estado}`);
            
            // La asignación de estado fue exitosa
            return 0;
        } else {
            // La orden no existe
            return 1;
        }
    } catch (error) {
        console.error("Error al asignar el estado de la orden:", error);
        return null; // Indicar un error en caso de que falle la operación
    }
}
async function serviceCambiarEstadoOrden(id_factura, nit_easyMats, id_cliente) {
    try {
        // Verificar si la orden existe en la tabla FACTURA_has_PRODUCTO
        const ordenExiste = await serviceBuscarOrden(id_factura, nit_easyMats, id_cliente);

        if (ordenExiste !== null) {
            // La orden existe, verificar si el producto asociado está presente en la base de datos
            const productoExiste = await serviceExisteProducto(ordenExiste.PRODUCTO_ID_PRODUCTO, ordenExiste.PRODUCTO_PROVEEDORES_ID_PROVEEDOR);
            
            // Determinar el estado a imprimir
            const estado = productoExiste ? 'activo' : 'inactivo';

            // Imprimir el estado de la orden
            console.log(`El estado de la orden con ID ${id_factura} es: ${estado}`);
            
            // El cambio de estado fue exitoso (en este caso, solo se imprime el estado)
            return 0;
        } else {
            // La orden no existe
            console.log(`La orden con ID ${id_factura} no existe`);
            return 1;
        }
    } catch (error) {
        console.error("Error al cambiar el estado de la orden:", error);
        return null; // Indicar un error en caso de que falle la operación
    }
}

async function serviceCalcularOrden(id_factura, nit_easyMats, id_cliente) {
    try {
        // Realizar el cálculo de la orden en la tabla FACTURA_has_PRODUCTO
        const resultado = await pool.query("SELECT SUM(precio) AS total FROM PRODUCTO WHERE ID_PRODUCTO IN (SELECT PRODUCTO_ID_PRODUCTO FROM FACTURA_has_PRODUCTO WHERE FACTURA_ID_FACTURA = $1 AND FACTURA_EASYMATS_NIT = $2 AND FACTURA_CLIENTES_ID_CLIENTES = $3)", [id_factura, nit_easyMats, id_cliente]);
        
        // Verificar si se encontraron resultados
        if (resultado.rows.length > 0) {
            // Se encontró el total de la orden
            return resultado.rows[0].total;
        } else {
            // No se encontró la orden
            return null;
        }
    } catch (error) {
        console.error("Error al calcular la orden:", error);
        return null; // Indicar un error en caso de que falle la consulta
    }
}

module.exports = {
 serviceRegistrarOrden,
 serviceActualizarOrden,
 serviceBuscarOrden,
 serviceCambiarEstadoOrden,
 serviceAsignarEstadoOrden,
 serviceCalcularOrden
};