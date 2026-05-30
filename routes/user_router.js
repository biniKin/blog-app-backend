// create account
// login to account
// log out

const express = require("express");
const { signIn, signUp, refresh } = require("../controller/user_controller");

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/refresh", refresh);

module.exports = router;