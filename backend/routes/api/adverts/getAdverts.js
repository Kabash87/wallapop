const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");

// Ruta para obtener listado de anuncios
// GET /api/adverts
router.get("/", async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json({
      message: "Listado de anuncios obtenido con éxito",
      results: adverts,
    });
  } catch (error) {
    console.error("Error al obtener los anuncios:", error);
    res.status(500).json({ message: "Algo salió mal" });
  }
});

module.exports = router;
