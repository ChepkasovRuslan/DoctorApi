const { getAllUsers, registerUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
const { JWT_SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users.length) res.status(200).send(users);
    else res.status(404).send("Users not found");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const postNewUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const jwtSecretKey = JWT_SECRET_KEY;
    const user = await registerUser(req.body);
    const accessToken = jwt.sign(user.toJSON(), jwtSecretKey, {
      expiresIn: 60 * 60 * 10,
    });
    const refreshToken = jwt.sign(user.toJSON(), jwtSecretKey, {
      expiresIn: 60 * 60 * 15,
    });

    res.status(201).json({ accessToken: accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  postNewUser,
};
