require("dotenv").config();
const User = require("./models/User");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var port = 4000;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//conexion a DB
require("./lib/connectMongoose");

var app = express();

const multer = require("multer");

// Configura Multer para guardar archivos en una carpeta específica
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único basado en la fecha actual
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Usa multer como middleware para manejar las solicitudes que requieren análisis de archivos
app.use(upload.single("photo"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Rutas del API
 */
app.use("/api/adverts", require("./routes/api/adverts"));

/**
 * Rutas del Website
 */
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("¡El servidor backend está funcionando!");
});

//Cerrar Sesion
app.get("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.clearCookie("email-user");
  res.clearCookie("user-name");
  res.clearCookie("recovery-pass");
  res.redirect("http://localhost:3000/login");
});

//Verificar Usuario
app.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      res.redirect("/logout");
    } else {
      res.redirect("http://localhost:3000/");
      console.log("El Correo electronico no esta verificado");
    }
  } catch (err) {
    console.log(err);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

module.exports = app;
