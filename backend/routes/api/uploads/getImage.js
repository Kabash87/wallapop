const express = require('express');
const router = express.Router();
const path = require('path');


// Ruta para servir imágenes subidas por el usuario
// GET /uploads/:imageName
router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName; // Recupera el nombre de la imagen del parámetro en la URL
  const ext = path.extname(imageName); // Extrae la extensión de la imagen del nombre del archivo

  // Establece el tipo de contenido adecuado en función de la extensión del archivo
  if (ext === ".jpeg" || ext === ".jpg") {
    res.setHeader("Content-Type", "image/jpeg");
  } else if (ext === ".png") {
    res.setHeader("Content-Type", "image/png");
  }

  // Envía la imagen solicitada como respuesta
  res.sendFile(path.join(__dirname, "../../public/uploads", imageName));
});

module.exports = router;
