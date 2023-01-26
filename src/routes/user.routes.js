const express = require("express");
const { userValidation } = require("../middlewares/user.validation");

const router = express.Router();

const { postNewUser } = require("../controllers/user.controller");

router.post("/reg", userValidation, postNewUser);

module.exports = router;
