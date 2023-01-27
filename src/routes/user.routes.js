const express = require("express");

const userRouter = express.Router();

const userCtrl = require("../controllers/user.controller");

userRouter.get("/users", userCtrl.getUsers);
userRouter.get("/users/id/:id", userCtrl.getUser);
userRouter.delete("/users", userCtrl.deleteUsers);
userRouter.delete("/users/id/:id", userCtrl.deleteUser);

module.exports = userRouter;
