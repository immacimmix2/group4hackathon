// routes/login.js
const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/login");

router.post("/loginUser", loginUser);

module.exports = router;
