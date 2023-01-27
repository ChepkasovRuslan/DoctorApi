const express = require("express");

const userRouter = express.Router();

const userCtrl = require("../controllers/user.controller");
const { idValidation } = require("../middlewares/validators/id.validation");

userRouter.get("/users", userCtrl.getUsers);
userRouter.get("/user/:id", idValidation, userCtrl.getUser);
userRouter.delete("/users", userCtrl.deleteUsers);
userRouter.delete("/user/:id", userCtrl.deleteUser);

module.exports = userRouter;
