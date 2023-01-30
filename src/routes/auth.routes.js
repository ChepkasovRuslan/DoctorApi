const express = require("express");
const { userValidation } = require("../middlewares/validators/user.validation");

const authRouter = express.Router();

const authCtrl = require("../controllers/auth.controller");

authRouter.post("/auth/login", authCtrl.authorizeUser);
authRouter.post("/auth/registration", userValidation, authCtrl.registerNewUser);

module.exports = authRouter;
