const materialServices = require("../servidores/MaterialDeConstruccion.servidores.js");

// Controlador para verificar si un material existe
exports.verificarExistenciaMaterial = async (req, res) => {
    const { nombre_producto } = req.body;
    try {
        const existeMaterial = await materialServices.serviceExisteMaterial(nombre_producto);
        
        res.status(200).json({ existe: existeMaterial });
    } catch (error) {
        console.error("Error al verificar la existencia del material:", error);
        res.status(500).json({ error: "Error al verificar la existencia del material" });
    }
};

// Controlador para registrar un nuevo material
exports.registrarMaterial = async (req, res) => {
    const { id_producto, nombre_producto, descripcion, precio, id_proveedor } = req.body;
    try {
        const resultado = await materialServices.serviceRegistrarMaterial(id_producto, nombre_producto, descripcion, precio, id_proveedor);
        
        if (resultado === 0) {
            res.status(201).json({ message: "Material registrado exitosamente" });
        } else if (resultado === 1) {
            res.status(400).json({ error: "El material ya existe en la base de datos" });
        }
    } catch (error) {
        console.error("Error al registrar el material:", error);
        res.status(500).json({ error: "Error al registrar el material" });
    }
};

// Controlador para actualizar un material
exports.actualizarMaterial = async (req, res) => {
    const { id_producto, nombre_producto, descripcion, precio, id_proveedor } = req.body;
    try {
        const resultado = await materialServices.serviceActualizarMaterial(id_producto, nombre_producto, descripcion, precio, id_proveedor);
        
        if (resultado === 0) {
            res.status(200).json({ message: "Material actualizado exitosamente" });
        } else if (resultado === 1) {
            res.status(404).json({ error: "No se encontró el material para actualizar" });
        }
    } catch (error) {
        console.error("Error al actualizar el material:", error);
        res.status(500).json({ error: "Error al actualizar el material" });
    }
};

// Controlador para buscar un material por su nombre
exports.buscarMaterialPorNombre = async (req, res) => {
    const { nombre_producto } = req.params;
    try {
        const materiales = await materialServices.serviceBuscarMaterial(nombre_producto);
        
        if (materiales === null) {
            res.status(404).json({ error: "No se encontraron materiales con el nombre proporcionado" });
        } else {
            res.status(200).json(materiales);
        }
    } catch (error) {
        console.error("Error al buscar el material:", error);
        res.status(500).json({ error: "Error al buscar el material" });
    }
};
