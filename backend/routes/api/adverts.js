const express = require("express");
const router = express.Router();
const corst = require("cors");
//carga del modelo de anuncio
const Advert = require("../../models/Advert.js");

router.use(corst());

// GET /api/adverts
router.get("/", async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json({ results: adverts });
  } catch (error) {
    console.log(error); //TODO:BORRAR cuando dev termine
    next(error);
  }
});

module.exports = router;
