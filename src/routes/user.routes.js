const express = require("express");
const { userValidation } = require("../middlewares/user.validation");

const router = express.Router();

const {
  getUsers,
  getUser,
  postNewUser,
} = require("../controllers/user.controller");

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/reg", userValidation, postNewUser);

module.exports = router;
