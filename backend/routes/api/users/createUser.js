require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../../../models/User.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { transporter } = require("../../../utils/userHelpers");

// Ruta para crear un nuevo USUARIO
// POST api/users/create-user
router.post("/", async (req, res, next) => {
  try {
    // Obtener los datos del usuario desde el cuerpo de la solicitud
    const { name, number, email, gender, password } = req.body;

    // Crear un objeto con los datos del usuario
    const newUser = new User({
      name,
      number,
      email,
      gender,
      password,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });

    //Verifica si el usuario no se encuentra ya registrado
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      res.status(409).json({
        mensaje: "El correo ya esta registrado en la Base de datos.",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newUser.password, salt);
      newUser.password = hashPassword;

      // Guardar el usuario en la base de datos
      const savedUser = await newUser.save();

      //Envio de Correo Electronico
      var mailOptions = {
        from: "diegohs1503@gmail.com",
        to: newUser.email,
        subject: " What a Duck! 🦆 Verifica tu correo electronico✅",
        html: `<h2>¡Gracias por registrarte en What a Duck! Bienvenido,  ${newUser.name}</h2>
                <h4> Porfavor, verifique su correo electronico para continuar...</h4>
                <a href="http://${req.headers.host}/verify-email?token=${newUser.emailToken}">Verificar Correo</a>`,
      };

      //Se envia el correo de verificacion
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            "El correo de verificacion ha sido enviado correctamente"
          );
        }
      });

      // Responder al cliente con un mensaje de éxito
      res.status(201).json({
        mensaje:
          "Usuario creado con éxito. Verifique su correo electronico para validarlo",
      });
    }
  } catch (error) {
    console.error("Error al crear el Usuario:", error);
    next(error);
  }
});

module.exports = router;
