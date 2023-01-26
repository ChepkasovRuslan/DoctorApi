const express = require("express");
const { userValidation } = require("../middlewares/user.validation");

const router = express.Router();

const {
  getUsers,
  getUser,
  postNewUser,
  deleteUsers,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users/reg", userValidation, postNewUser);
router.delete("/users", deleteUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;
