const notaServices = require("../servidores/NotaDeCredito.servidores.js");

// Controlador para registrar una nueva nota
exports.registrarNota = async (req, res) => {
    const { id_nota, descripcion } = req.body;
    try {
        const resultado = await notaServices.serviceRegistrarNota(id_nota, descripcion);
        
        if (resultado === 0) {
            res.status(201).json({ message: "Nota registrada exitosamente" });
        } else {
            res.status(500).json({ error: "Error al registrar la nota" });
        }
    } catch (error) {
        console.error("Error al registrar la nota:", error);
        res.status(500).json({ error: "Error al registrar la nota" });
    }
};

// Controlador para buscar una nota por su ID
exports.buscarNotaPorId = async (req, res) => {
    const { id_nota } = req.params;
    try {
        const nota = await notaServices.serviceBuscarNota(id_nota);
        
        if (nota === null) {
            res.status(404).json({ error: "No se encontró la nota" });
        } else {
            res.status(200).json(nota);
        }
    } catch (error) {
        console.error("Error al buscar la nota:", error);
        res.status(500).json({ error: "Error al buscar la nota" });
    }
};
