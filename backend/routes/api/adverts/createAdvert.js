const express = require("express");
const router = express.Router();
const Advert = require("../../../models/Advert");
const upload = require('../../../config/multerConfig');
const { loginrequired } = require('../../../config/JWT');

// Ruta para crear un nuevo anuncio
// POST api/adverts/create-advert
router.post(
    "/",
    loginrequired,
    upload.single("photo"),
    async (req, res, next) => {
      try {
        // Obtener los datos del anuncio desde el cuerpo de la solicitud
        const { name, price, description, type, tags } = req.body;
  
        // Comprobar si se ha cargado una foto
        let photoFilename;
        if (req.file) {
          photoFilename = req.file.filename;
        } else {
          photoFilename = "";
        }
  
        // Crear un objeto con los datos del anuncio
        const newAdvert = new Advert({
          name,
          price,
          description,
          type,
          tags,
          photo: photoFilename,
          owner: res.newUser
        });
        // Guardar el anuncio en la base de datos
        const savedAdvert = await newAdvert.save();
  
        // Responder al cliente con el anuncio recién creado
        res.status(201).json({ message: "Anuncio creado con éxito", advert: savedAdvert });
      } catch (error) {
        // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
        console.error("Error al crear el anuncio:", error);
        next(error);
      }
    }
  );
  

module.exports = router;