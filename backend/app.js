require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var port = process.env.PORT;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//conexion a DB
require("./lib/connectMongoose");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/uploads/:imageName', (req, res) => {
  console.log("Dentro de la ruta de imágenes"); // Nuevo log

  const imageName = req.params.imageName;
  const ext = path.extname(imageName);

  if (ext === '.jpeg' || ext === '.jpg') {
      res.setHeader('Content-Type', 'image/jpeg');
  } else if (ext === '.png') {
      res.setHeader('Content-Type', 'image/png');
  }
  console.log("Establecido el Content-Type a:", res.get('Content-Type')); // Nuevo log

  res.sendFile(path.join(__dirname, 'public/uploads', imageName));
});


/**
 * Rutas del API
 */
app.use("/api/adverts", require("./routes/api/adverts"));

/**
 * Rutas del Website
 */
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

module.exports = app;
