const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const loginrequired = async (req, res, next) => {
  const token = req.cookies["access-token"];
  if (token) {
    const validatetoken = await jwt.verify(token, process.env.JWT_SECRET);
    if (validatetoken) {
      res.newUser = validatetoken.id;
      next();
    } else {
      console.log("Se vence el Token");
    }
  } else {
    console.log("Token no encontrado");
    res.render("http://localhost:3000/login");
  }
};

module.exports = { loginrequired };
