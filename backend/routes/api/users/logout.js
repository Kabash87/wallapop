var express = require("express");
var router = express.Router();

//Ruat apara cerrar Sesion
// POST api/users/logout

router.post("/", (req, res) => {
    res.clearCookie("access-token");
    res.clearCookie("email-user");
    res.clearCookie("user-name");
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  });

module.exports = router;






