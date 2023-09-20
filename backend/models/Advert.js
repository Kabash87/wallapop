const mongoose = require("mongoose");

// Definir el esquema del modelo de Anuncio
const advertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['compra', 'venta'], required: true },
  tags: { type: [String], required: true },
  photo: { type: String }, 
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required: true
  }
});

// Crear el modelo 'Anuncio' a partir del esquema
const Advert = mongoose.model("adverts", advertSchema);

//exportar el modelo
module.exports = Advert;
