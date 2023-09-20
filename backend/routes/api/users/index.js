const express = require("express");
const router = express.Router();

router.use("/create-user", require("./createUser"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));
router.use("/verify-email", require("./verifyEmail"));
router.use("/recovery", require("./recovery"));
router.use("/change-password", require("./changePassword"));
router.use("/contact", require("./contact"));

module.exports = router;
