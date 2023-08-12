// routes/anuncios.js
const express = require("express");
const router = express.Router();
const Anuncio = require("../models/anuncio"); // Importar el modelo Anuncio

// Ruta para crear un nuevo anuncio
router.post("/api/anuncios", async (req, res) => {
  try {
    console.log("Datos enviados desde el frontend:", req.body);
    // Obtener los datos del anuncio desde el cuerpo de la solicitud
    const { titulo, descripcion, precio } = req.body;

    // Crear un objeto con los datos del anuncio
    const nuevoAnuncio = new Anuncio({
      titulo,
      descripcion,
      precio,
    });

    // Guardar el anuncio en la base de datos
    const anuncioGuardado = await nuevoAnuncio.save();

    // Imprimir un mensaje de registro en la consola para verificar la inserción
    console.log("Anuncio creado con éxito:", anuncioGuardado);

    // Responder al cliente con un mensaje de éxito
    res.status(201).json({ mensaje: "Anuncio creado con éxito" });
  } catch (error) {
    // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
    console.error("Error al crear el anuncio:", error);

    // Responder al cliente con un mensaje de error
    res.status(500).json({ mensaje: "Error al crear el anuncio" });
  }
});

module.exports = router;
