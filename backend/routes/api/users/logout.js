var express = require("express");
var router = express.Router();

//Cerrar Sesion
router.get("/", (req, res) => {
  res.clearCookie("access-token");
  res.clearCookie("email-user");
  res.clearCookie("user-name");
  res.clearCookie("recovery-pass");
  res.redirect("http://localhost:3000/login");
});

module.exports = router;
