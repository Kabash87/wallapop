const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");
const { loginrequired } = require('../../../config/JWT');


// Ruta para editar un anuncio por ID
// PUT api/adverts/edit/:id
router.put("/:id", loginrequired, async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedData = req.body; // Los datos actualizados se envian en el cuerpo de la solicitud
  
      // Buscar el anuncio por ID
      const advert = await Advert.findById(id);   
  
      if (!advert) {
        return res.status(404).json({ message: "Anuncio no encontrado" });
      }

      // Verificar si el usuario es el propietario del anuncio
      if (advert.owner.toString() !== res.newUser) {
        return res.status(403).json({ message: "No tienes permiso para editar este anuncio" });
      }

      // Si el usuario es el propietario, actualizar el anuncio
      const updatedAd = await Advert.findByIdAndUpdate(id, updatedData, { new: true });
  
      // Si se actualiza correctamente, devolver el anuncio actualizado
      res.json({ message: "Anuncio actualizado con éxito", data: updatedAd });
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;