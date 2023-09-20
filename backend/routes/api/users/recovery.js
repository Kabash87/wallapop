var express = require("express");
var router = express.Router();
const User = require("../../../models/User.js");
const { transporter } = require ("../../../utils/userHelpers");


//Recuperacion de contraseña
router.post("/", async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email);
      const findUser = await User.findOne({ email: email });
      if (findUser) {
        console.log("Se ha encontrado una coincidencia");
        const changePass = findUser.email;
        res.cookie("recovery-pass", changePass);
        res.status(201).json({
          mensaje:
            "Se ha enviado el enlace de recuperacion a su correo electronico",
        });
        //Envio de Correo Electronico
        var mailOptions = {
          from: "whataduck.project@gmail.com",
          to: email,
          subject: " What a Duck! 🦆 Recuperar cuenta y cambiar contraseña 🔄",
          html: `<h2>¿Has olvidado tu contraseña en What a Duck?, </h2>
              <h4> Porfavor, ingrese al siguiente enlace para cambiar la contraseña de su cuenta...</h4>
              <a href="http://localhost:3000/restore-password?token=${changePass}">Cambiar contraseña</a>`,
        };
  
        //Se envia el correo de verificacion
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(
              "El correo de recuperacion ha sido enviado correctamente"
            );
          }
        });
      } else {
        console.log("No hay nada alli");
        res.status(500).json({
          mensaje: "El correo no esta registrado en la Base de datos.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  

  module.exports = router;
 