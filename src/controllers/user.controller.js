const {
  getAllUsers,
  getUserById,
  registerUser,
  deleteAllUsers,
  deleteUserById,
} = require("../services/user.service");
const { validationResult } = require("express-validator");
const { JWT_SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users.length) res.status(200).send(users);
    else res.status(404).json({ msg: "Users not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (user) res.status(200).send(user);
    else res.status(404).json({ msg: "User not found" });
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

const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await deleteAllUsers();

    if (deletedUsers.deletedCount) res.status(202).send(deletedUsers);
    else res.status(404).json({ msg: "Users not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);

    if (deletedUser) res.status(202).send(deletedUser);
    else res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  postNewUser,
  deleteUsers,
  deleteUser,
};
