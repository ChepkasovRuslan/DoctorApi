const express = require("express");
const { userValidation } = require("../middlewares/user.validation");

const authRouter = express.Router();

const authCtrl = require("../controllers/user.controller");

authRouter.get("/auth/login", authCtrl.authorizeUser);
authRouter.post("/auth/registration", userValidation, authCtrl.postNewUser);

module.exports = authRouter;
