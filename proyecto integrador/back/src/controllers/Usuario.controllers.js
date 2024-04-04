const usuarioServices = require("../servidores/Usuario.servidores.js");

// Controlador para registrar un usuario
exports.registrarUsuario = async (req, res) => {
    const { tipoUsuario, nombre, direccion, telefono, usuario, contrasena } = req.body;
    try {
        const resultado = await usuarioServices.serviceRegistrarUsuario(tipoUsuario, nombre, direccion, telefono, usuario, contrasena);
        
        if (resultado === 0) {
            res.status(201).json({ message: `Usuario ${tipoUsuario} registrado exitosamente` });
        } else {
            res.status(500).json({ error: "Error al registrar el usuario" });
        }
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

// Controlador para actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
    const { tipoUsuario, idUsuario } = req.params;
    const nuevosDatos = req.body;
    try {
        const resultado = await usuarioServices.serviceActualizarUsuario(tipoUsuario, idUsuario, nuevosDatos);
        
        if (resultado === 0) {
            res.status(200).json({ message: `Usuario ${tipoUsuario} actualizado correctamente` });
        } else if (resultado === 1) {
            res.status(404).json({ error: `No se encontró un usuario ${tipoUsuario} con el ID proporcionado` });
        } else {
            res.status(500).json({ error: "Error al actualizar el usuario" });
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

// Controlador para buscar un usuario por su ID
exports.buscarUsuarioPorId = async (req, res) => {
    const { tipoUsuario, idUsuario } = req.params;
    try {
        const usuario = await usuarioServices.serviceBuscarUsuario(tipoUsuario, idUsuario);
        
        if (usuario === null) {
            res.status(404).json({ error: `No se encontró un usuario ${tipoUsuario} con el ID proporcionado` });
        } else {
            res.status(200).json(usuario);
        }
    } catch (error) {
        console.error("Error al buscar el usuario:", error);
        res.status(500).json({ error: "Error al buscar el usuario" });
    }
};

// Controlador para cambiar el estado de un usuario
exports.cambiarEstadoUsuario = async (req, res) => {
    const { tipoUsuario, idUsuario } = req.params;
    const { nuevoEstado } = req.body;
    try {
        const resultado = await usuarioServices.serviceCambiarEstadoUsuario(tipoUsuario, idUsuario, nuevoEstado);
        
        if (resultado === 0) {
            res.status(200).json({ message: `Estado del usuario ${tipoUsuario} actualizado correctamente` });
        } else if (resultado === 1) {
            res.status(404).json({ error: `No se encontró un usuario ${tipoUsuario} con el ID proporcionado` });
        } else {
            res.status(500).json({ error: "Error al cambiar el estado del usuario" });
        }
    } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
        res.status(500).json({ error: "Error al cambiar el estado del usuario" });
    }
};

// Controlador para obtener el estado de un usuario
exports.estadoDeUsuario = async (req, res) => {
    const { tipoUsuario, idUsuario } = req.params;
    try {
        const estado = await usuarioServices.serviceEstadoDeUsuario(tipoUsuario, idUsuario);
        
        if (estado === null) {
            res.status(404).json({ error: `No se encontró un usuario ${tipoUsuario} con el ID proporcionado` });
        } else {
            res.status(200).json({ estado });
        }
    } catch (error) {
        console.error("Error al obtener el estado del usuario:", error);
        res.status(500).json({ error: "Error al obtener el estado del usuario" });
    }
};

// Controlador para la autenticación de usuarios
exports.autenticarUsuario = async (req, res) => {
    const { usuario, contrasena } = req.body;
    try {
        const resultado = await usuarioServices.serviceAutentificacion(usuario, contrasena);
        
        if (resultado === false) {
            res.status(401).json({ error: "Credenciales de usuario incorrectas" });
        } else if (resultado === null) {
            res.status(500).json({ error: "Error en la autenticación" });
        } else {
            res.status(200).json(resultado);
        }
    } catch (error) {
        console.error("Error en la autenticación:", error);
        res.status(500).json({ error: "Error en la autenticación" });
    }
};
