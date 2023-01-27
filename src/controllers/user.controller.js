const {
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById,
} = require("../services/user.service");
const { validationResult } = require("express-validator");
const { logError } = require("../services/logger.service");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await getUserById(req.params.id);
    if (user) res.status(200).send(user);
    else res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await deleteAllUsers();

    res.status(202).send(deletedUsers);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);

    if (deletedUser) res.status(202).send(deletedUser);
    else res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUsers,
  deleteUser,
};
