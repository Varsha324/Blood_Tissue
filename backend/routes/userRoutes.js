const express = require("express");
const { signUpUser, loginUser, currentUser } = require("../controllers/usercontroller");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/signup", signUpUser)

router.post("/login",loginUser)

router.get("/current",validateToken ,currentUser)

module.exports = router;