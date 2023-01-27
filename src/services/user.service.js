const User = require("../models/user");

const getAllUsers = async () => await User.find();

const getUserById = async (id) => await User.findById(id);

const getUserByLogin = async (login) => await User.findOne({ login: login });

const checkExistingUser = async (login) => await User.exists({ login: login });

const registerUser = async (body) => {
  return await User.create({
    login: body.login,
    password: body.password,
  });
};

const deleteAllUsers = async () => await User.deleteMany({});

const deleteUserById = async (id) => await User.findByIdAndDelete(id);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByLogin,
  checkExistingUser,
  registerUser,
  deleteAllUsers,
  deleteUserById,
};
