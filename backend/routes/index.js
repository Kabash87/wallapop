var express = require("express");
var router = express.Router();
var cors = require("cors");



router.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
    })
  );


/**
 * Rutas del API
 */
router.use("/api/adverts", require("./api/adverts"));
router.use("/api/users", require("./api/users"));
router.use("/uploads", require("./api/uploads"));

module.exports = router;
