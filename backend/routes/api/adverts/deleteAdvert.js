const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");
const { loginrequired } = require('../../../config/JWT');

// Ruta para eliminar un anuncio por ID
router.delete("/:id", loginrequired, async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const advert = await Advert.findByIdAndDelete(id);
  
      // Si no se encuentra el anuncio, devolvemos un 404
      if (!advert) {
        return res.status(404).json({ message: "Anuncio no encontrado" });
      }

       // Verificar si el usuario es el propietario del anuncio
       if (advert.owner.toString() !== res.newUser) {
        return res.status(403).json({ message: "No tienes permiso para eliminar este anuncio" });
      }

      // Si el usuario es el propietario, eliminar el anuncio
      await Advert.findByIdAndDelete(id);
  
      // Si la eliminación es exitosa, devolvemos un 204 sin contenido
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;