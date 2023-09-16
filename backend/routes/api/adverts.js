const express = require("express");
const router = express.Router();
const cors = require("cors");
//carga del modelo de anuncio
const Advert = require("../../models/Advert.js");
const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookie = require("js-cookie");
const { loginrequired } = require("../../config/JWT.js");

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

//Para el Token y la Cookie
require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// GET /api/adverts
// router.get("/", loginrequired, async (req, res, next) => {
router.get("/", async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json({ results: adverts });
  } catch (error) {
    console.log(error); //TODO:BORRAR cuando dev termine
    next(error);
  }
});

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
  // upload.single('photo'),
  async (req, res, next) => {
    try {
      console.log("Datos enviados desde el frontend:", req.body);
      // Obtener los datos del anuncio desde el cuerpo de la solicitud
      const { name, price, description, type, tags, photo, username, email } =
        req.body;

      // Obtener el nombre del archivo del campo de "foto" cargado
      // const photo = req.file.filename;

      // Crear un objeto con los datos del anuncio
      const newAdvert = new Advert({
        name,
        price,
        description,
        type,
        tags,
        photo,
        username,
        email,
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

// Ruta para crear un nuevo USUARIO
router.post(
  "/create-user",
  // upload.single('photo'),
  async (req, res, next) => {
    try {
      console.log("Datos enviados desde el frontend:", req.body);
      // Obtener los datos del anuncio desde el cuerpo de la solicitud
      const { name, number, email, gender, password } = req.body;

      // Obtener el nombre del archivo del campo de "foto" cargado
      // const photo = req.file.filename;

      // Crear un objeto con los datos del anuncio
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
        console.log("El correo ya esta registrado en la Base de datos");
        res.status(500).json({
          mensaje: "El correo ya esta registrado en la Base de datos.",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashPassword;

        // Guardar el anuncio en la base de datos
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

        // Imprimir un mensaje de registro en la consola para verificar la inserción
        console.log("Usuario creado con éxito:", savedUser);

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
      // Si ocurre un error, imprimir un mensaje de registro en la consola con el error
      console.error("Error al crear el Usuario:", error);
      next(error);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        console.log("Sesion iniciada correctamente. Bien hecho");
        //Crear token
        const token = createToken(findUser.id);
        const nameUser = findUser.name;
        const emailUser = findUser.email;
        console.log("El token de acceso es: ", token);
        res.cookie("access-token", token);
        res.cookie("user-name", nameUser);
        res.cookie("email-user", emailUser);
        // Responder al cliente con un mensaje de éxito
        res.status(201).json({ mensaje: "Log In creado con éxito" });
      } else {
        console.log("Contraseña Invalida");
      }
    } else {
      console.log("No se ha encontrado el usuario");
    }
  } catch (err) {
    console.log(err);
  }
});

//Recuperacion de contraseña
router.post("/recovery", async (req, res) => {
  try {
    const { email } = req.body;
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

module.exports = router;
