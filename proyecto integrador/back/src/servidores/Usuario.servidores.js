const { query } = require("express");
const pool = require ("../providers/conexion");
async function serviceRegistrarUsuario(tipoUsuario, nombre, direccion, telefono, usuario, contrasena) {
    try {
        let tabla = null;
        let idCampo = null;
        let valores = [nombre, direccion, telefono, usuario, contrasena];

        // Determinar la tabla correspondiente según el tipo de usuario
        switch (tipoUsuario) {
            case 'empleado':
                tabla = 'EMPLEADOS';
                idCampo = 'ID_EMPLEADO';
                break;
            case 'proveedor':
                tabla = 'PROVEEDORES';
                idCampo = 'ID_PROVEEDOR';
                valores.pop(); // Eliminar el último valor (contraseña) ya que no se almacena en la tabla proveedores
                break;
            case 'cliente':
                tabla = 'CLIENTES';
                idCampo = 'ID_CLIENTES';
                valores.push(1); // Asumiendo que el estado de cuenta por defecto es 1 (activo)
                break;
            default:
                console.log("Tipo de usuario inválido.");
                return 4; // Indicar que el tipo de usuario es inválido
        }

        // Realizar la inserción en la tabla correspondiente
        const query = `INSERT INTO ${tabla} (NOMBRE${tabla === 'PROVEEDORES' ? '_PROV' : ''}, DIRECCION${tabla === 'CLIENTES' ? '_CLIENTE' : ''}, TELEFONO${tabla === 'CLIENTES' ? '_CLIENTE' : ''}, ${tabla === 'PROVEEDORES' ? 'NIT' : tabla === 'EMPLEADOS' ? 'CORREO_EMPLEADO' : 'USER_CLIENTE'}, ${tabla === 'EMPLEADOS' ? 'ROL_EMPLEADO, CONTRASEÑA_EMPLEADO' : 'PASSWORD_CLIENTE'}, ${tabla === 'CLIENTES' ? 'ESTADO_CUENTA_ID_ESTADO' : ''}) VALUES (${valores.map((_, index) => '$' + (index + 1)).join(', ')})`;
        await pool.query(query, valores);

        console.log(`Usuario registrado correctamente como ${tipoUsuario}.`);
        return 0; // Indicar que el usuario se registró correctamente
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return null; // Indicar un error en caso de que falle la operación
    }
}

async function serviceActualizarUsuario(tipoUsuario, idUsuario, nuevosDatos) {
    try {
        let tabla = null;
        let camposActualizables = null;

        // Determinar la tabla correspondiente y los campos actualizables según el tipo de usuario
        switch (tipoUsuario) {
            case 'empleado':
                tabla = 'EMPLEADOS';
                camposActualizables = ['NOMBRE_EMPLEADO', 'DIRECCION_EMPLEADO', 'CORREO_EMPLEADO', 'ROL_EMPLEADO', 'CONTRASEÑA_EMPLEADO'];
                break;
            case 'proveedor':
                tabla = 'PROVEEDORES';
                camposActualizables = ['NOMBRE_PROV', 'DIRECCION_PROV', 'TELEFONO_PROV', 'NIT'];
                break;
            case 'cliente':
                tabla = 'CLIENTES';
                camposActualizables = ['NOMBRE', 'DIRECCION_CLIENTE', 'TELEFONO_CLIENTE', 'USER_CLIENTE', 'PASSWORD_CLIENTE'];
                break;
            default:
                console.log("Tipo de usuario inválido.");
                return 1; // Indicar que el tipo de usuario es inválido
        }

        // Generar la cadena de actualización dinámica para los campos especificados
        let updateString = '';
        const values = [];
        for (const campo in nuevosDatos) {
            if (camposActualizables.includes(campo)) {
                updateString += `${campo} = $${values.length + 1}, `;
                values.push(nuevosDatos[campo]);
            }
        }
        updateString = updateString.slice(0, -2); // Eliminar la coma y el espacio al final

        // Realizar la actualización en la tabla correspondiente
        const query = `UPDATE ${tabla} SET ${updateString} WHERE ${idCampo} = $${values.length + 1}`;
        values.push(idUsuario);

        const resultado = await pool.query(query, values);
        if (resultado.rowCount > 0) {
            console.log(`Usuario ${tipoUsuario} actualizado correctamente.`);
            return 0; // Indicar que el usuario se actualizó correctamente
        } else {
            console.log(`No se encontró un usuario ${tipoUsuario} con el ID proporcionado.`);
            return 2; // Indicar que no se encontró un usuario con el ID proporcionado
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return null; // Indicar un error en caso de que falle la operación
    }
}

async function serviceBuscarUsuario(tipoUsuario, idUsuario) {
    try {
        let tabla = null;
        let idCampo = null;

        // Determinar la tabla y el campo de ID según el tipo de usuario
        switch (tipoUsuario) {
            case 'empleado':
                tabla = 'EMPLEADOS';
                idCampo = 'ID_EMPLEADO';
                break;
            case 'proveedor':
                tabla = 'PROVEEDORES';
                idCampo = 'ID_PROVEEDOR';
                break;
            case 'cliente':
                tabla = 'CLIENTES';
                idCampo = 'ID_CLIENTES';
                break;
            default:
                console.log("Tipo de usuario inválido.");
                return null; // Indicar que el tipo de usuario es inválido
        }

        // Realizar la búsqueda en la tabla correspondiente por ID
        const query = `SELECT * FROM ${tabla} WHERE ${idCampo} = $1`;
        const resultado = await pool.query(query, [idUsuario]);

        if (resultado.rows.length > 0) {
            console.log(`Usuario ${tipoUsuario} encontrado.`);
            return resultado.rows[0]; // Devolver los datos del usuario encontrado
        } else {
            console.log(`No se encontró un usuario ${tipoUsuario} con el ID proporcionado.`);
            return null; // Indicar que no se encontró un usuario con el ID proporcionado
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        return null; // Indicar un error en caso de que falle la operación
    }
}

async function serviceCambiarEstadoUsuario(tipoUsuario, idUsuario, nuevoEstado) {
    try {
        let tabla = null;
        let idCampo = null;

        // Determinar la tabla y el campo de ID según el tipo de usuario
        switch (tipoUsuario) {
            case 'empleado':
                tabla = 'EMPLEADOS';
                idCampo = 'ID_EMPLEADO';
                break;
            case 'proveedor':
                tabla = 'PROVEEDORES';
                idCampo = 'ID_PROVEEDOR';
                break;
            case 'cliente':
                tabla = 'CLIENTES';
                idCampo = 'ID_CLIENTES';
                break;
            default:
                console.log("Tipo de usuario inválido.");
                return null; // Indicar que el tipo de usuario es inválido
        }

        // Actualizar el estado del usuario en la tabla correspondiente
        const query = `UPDATE ${tabla} SET ESTADO_CUENTA_ID_ESTADO = $1 WHERE ${idCampo} = $2`;
        const resultado = await pool.query(query, [nuevoEstado, idUsuario]);

        if (resultado.rowCount > 0) {
            console.log(`Estado del usuario ${tipoUsuario} actualizado correctamente.`);
            return 0; // Indicar que se actualizó el estado del usuario correctamente
        } else {
            console.log(`No se encontró un usuario ${tipoUsuario} con el ID proporcionado.`);
            return 1; // Indicar que no se encontró un usuario con el ID proporcionado
        }
    } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
        return null; // Indicar un error en caso de que falle la operación
    }
}

async function serviceEstadoDeUsuario(tipoUsuario, idUsuario) {
    try {
        let tabla = null;
        let idCampo = null;

        // Determinar la tabla y el campo de ID según el tipo de usuario
        switch (tipoUsuario) {
            case 'empleado':
                tabla = 'EMPLEADOS';
                idCampo = 'ID_EMPLEADO';
                break;
            case 'proveedor':
                tabla = 'PROVEEDORES';
                idCampo = 'ID_PROVEEDOR';
                break;
            case 'cliente':
                tabla = 'CLIENTES';
                idCampo = 'ID_CLIENTES';
                break;
            default:
                console.log("Tipo de usuario inválido.");
                return null; // Indicar que el tipo de usuario es inválido
        }

        // Obtener el estado del usuario desde la tabla correspondiente
        const query = `SELECT ESTADO_CUENTA_ID_ESTADO FROM ${tabla} WHERE ${idCampo} = $1`;
        const resultado = await pool.query(query, [idUsuario]);

        if (resultado.rows.length > 0) {
            console.log(`Estado del usuario ${tipoUsuario} obtenido correctamente.`);
            return resultado.rows[0].ESTADO_CUENTA_ID_ESTADO; // Devolver el estado del usuario
        } else {
            console.log(`No se encontró un usuario ${tipoUsuario} con el ID proporcionado.`);
            return null; // Indicar que no se encontró un usuario con el ID proporcionado
        }
    } catch (error) {
        console.error("Error al obtener el estado del usuario:", error);
        return null; // Indicar un error en caso de que falle la operación
    }
}

const jwt = require("jsonwebtoken");
const secreto = "ingreso exitoso su usuario si sirve"; // Reemplaza "TuCadenaSecretaAqui" con tu propia cadena secreta

async function serviceAutentificacion(usuario, contraseña) {
    try {
        let tipoUsuario = null;
        let idCampo = null;

        // Buscar en la tabla de proveedores
        let query = "SELECT ID_PROVEEDOR FROM PROVEEDORES WHERE NOMBRE_PROV = $1 AND NIT = $2";
        let resultado = await pool.query(query, [usuario, contraseña]);
        if (resultado.rows.length > 0) {
            console.log("Proveedor autenticado correctamente.");
            const token = jwt.sign({ tipoUsuario: 'proveedor', idUsuario: resultado.rows[0].ID_PROVEEDOR }, secreto);
            return { token };
        }

        // Buscar en la tabla de empleados
        query = "SELECT ID_EMPLEADO FROM EMPLEADOS WHERE CORREO_EMPLEADO = $1 AND CONTRASEÑA_EMPLEADO = $2";
        resultado = await pool.query(query, [usuario, contraseña]);
        if (resultado.rows.length > 0) {
            console.log("Empleado autenticado correctamente.");
            const token = jwt.sign({ tipoUsuario: 'empleado', idUsuario: resultado.rows[0].ID_EMPLEADO }, secreto);
            return { token };
        }

        // Buscar en la tabla de clientes
        query = "SELECT ID_CLIENTES FROM CLIENTES WHERE USER_CLIENTE = $1 AND PASSWORD_CLIENTE = $2";
        resultado = await pool.query(query, [usuario, contraseña]);
        if (resultado.rows.length > 0) {
            console.log("Cliente autenticado correctamente.");
            const token = jwt.sign({ tipoUsuario: 'cliente', idUsuario: resultado.rows[0].ID_CLIENTES }, secreto);
            return { token };
        }

        // Si no se encontró en ninguna tabla, las credenciales son incorrectas
        console.log("Credenciales de usuario incorrectas.");
        return false;
    } catch (error) {
        console.error("Error en la autenticación:", error);
        return null;
    }
}



module.exports = {
    serviceRegistrarUsuario,
    serviceActualizarUsuario,
    serviceBuscarUsuario,
    serviceCambiarEstadoUsuario,
    serviceEstadoDeUsuario,
    serviceAutentificacion
};