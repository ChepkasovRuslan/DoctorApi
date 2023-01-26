const express = require("express");
const { userValidation } = require("../middlewares/user.validation");

const router = express.Router();

const { getUsers, postNewUser } = require("../controllers/user.controller");

router.get("/users", getUsers);
router.post("/reg", userValidation, postNewUser);

module.exports = router;
