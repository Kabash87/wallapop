require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../../../models/User.js");
const bcrypt = require("bcrypt");
const { createToken } = require("../../../utils/userHelpers");

// Ruta para iniciar sesion
// POST api/users/login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        console.log("Sesion iniciada correctamente");
        //Crear token
        const token = createToken(findUser.id);
        const nameUser = findUser.name;
        const emailUser = findUser.email;
        res.cookie("access-token", token);
        res.cookie("user-name", nameUser);
        res.cookie("email-user", emailUser);
        // Responder al cliente con un mensaje de éxito
        res
          .status(201)
          .json({
            mensaje: "Log In creado con éxito",
            token: token,
            userId: findUser.id,
          });
      } else {
        res.status(401).json({ mensaje: "Contraseña inválida" });
      }
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
