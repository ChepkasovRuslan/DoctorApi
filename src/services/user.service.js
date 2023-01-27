const User = require("../models/user");

const getAllUsers = async () => await User.find().limit(10).sort("login");

const getUserById = async (id) => await User.findById(id);

const deleteAllUsers = async () => await User.deleteMany({});

const deleteUserById = async (id) => await User.findByIdAndDelete(id);

module.exports = {
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById,
};
