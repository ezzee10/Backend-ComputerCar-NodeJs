const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const auth = require("../middleware/auth");

router.post("/", auth, emailController.sendEmail);

module.exports = router;
