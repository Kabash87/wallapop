const express = require("express");
const router = express.Router();
const cors = require("cors");
const Advert = require("../../models/Advert.js");
const cookie = require("cookie-parser");
const upload = require("../../config/multerConfig");
const bcrypt = require("bcrypt");
// const { loginrequired } = require("../../config/JWT.js");
const User = require("../../models/User.js");

//Configuracion de correos
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "whataduck.project@gmail.com",
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

//Devuelve una lista de tags permitidos
router.get("/tags", (req, res, next) => {
  //TODO: CAMBIAR A LLAMADA A BD PARA NO TENER LOS TAGS HARDCODEADOS
  const tags = [
    "Estilo de vida",
    "Motor",
    "Móvil",
    "Trabajo",
    "Tecnología",
    "Mascotas",
    "PCs",
    "Ropa",
    "Comida y Bebida",
    "Otros",
  ];

  res.json({ tags });
});

// GET /api/adverts
router.get(
  "/",
  //  loginrequired,
  async (req, res, next) => {
    try {
      const adverts = await Advert.find();
      res.json({ results: adverts });
    } catch (error) {
      console.log(error); //TODO:BORRAR cuando dev termine
      next(error);
    }
  }
);

// Ruta para obtener un anuncio por ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const advert = await Advert.findById(id);
    console.log("Anuncio encontrado:", advert);
    res.json(advert);
  } catch (error) {
    next(error);
  }
});

// Ruta para crear un nuevo anuncio
router.post(
  "/create-advert",
  upload.single("photo"),
  async (req, res, next) => {
    try {
      console.log("Datos enviados desde el frontend:", req.body);
      // Obtener los datos del anuncio desde el cuerpo de la solicitud
      const { name, price, description, type, tags } = req.body;

      // Comprobar si se ha cargado una foto
      let photoFilename;
      if (req.file) {
        photoFilename = req.file.filename;
      } else {
        photoFilename = ""; // Puedes dejar esto en blanco o poner un valor predeterminado
      }

      // Crear un objeto con los datos del anuncio
      const newAdvert = new Advert({
        name,
        price,
        description,
        type,
        tags,
        photo: photoFilename,
      });

      // Guardar el anuncio en la base de datos
      const savedAdvert = await newAdvert.save();

      // Imprimir un mensaje de registro en la consola para verificar la inserción
      console.log("Anuncio creado con éxito:", savedAdvert);

      // Responder al cliente con un mensaje de éxito
      res.status(201).json({ mensaje: "Anuncio creado con éxito" });
    } catch (error) {
      // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
      console.error("Error al crear el anuncio:", error);
      next(error);
    }
  }
);

// Ruta para editar un anuncio por ID
router.put("/edit/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; // Los datos actualizados se deben enviar en el cuerpo de la solicitud

    // Aquí puedes realizar la validación de datos si es necesario

    // Actualizar el anuncio por su ID y obtener el anuncio actualizado
    const updatedAd = await Advert.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedAd) {
      return res.status(404).json({ message: "Anuncio no encontrado" });
    }

    // Si se actualiza correctamente, devolver el anuncio actualizado
    res.json(updatedAd);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar un anuncio por ID
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await Advert.findByIdAndDelete(id);

    // Si no se encuentra el anuncio, devolvemos un 404
    if (!result) {
      return res.status(404).json({ message: "Anuncio no encontrado" });
    }

    // Si la eliminación es exitosa, devolvemos un 204 sin contenido
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

//Recuperacion de contraseña
router.post("/recovery", async (req, res) => {
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

//Recuperacion de contraseña
router.post("/change-password", async (req, res) => {
  try {
    const { password, password2, emailToken } = req.body;
    if (password == password2) {
      const findUser = await User.findOne({ email: emailToken });
      console.log(findUser.name);

      /**Se encripta la nueva contraseña */
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newPass = hashPassword;
      const updatedPass = await User.updateOne(
        { email: emailToken },
        { $set: { password: newPass } }
      );

      res.json(updatedPass);
    } else {
      res.status(500).json({
        mensaje: "Las constraseñas no son iguales.",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
