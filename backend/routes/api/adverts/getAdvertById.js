const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");

// Ruta para obtener un anuncio por ID 
// GET api/adverts/:id
router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const advert = await Advert.findById(id);
      res.json(advert);
    } catch (error) {
      console.error("Error al obtener el anuncio:", error);
      next(error);
    }
  });

module.exports = router;