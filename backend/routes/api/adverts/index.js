const express = require("express");
const router = express.Router();

router.use("/create-advert", require("./createAdvert"));
router.use("/edit/", require("./editAdvert"));
router.get("/:id", require("./getAdvertById"));
router.delete("/:id", require("./deleteAdvert"));
router.use("/", require("./getAdverts"));


module.exports = router;
