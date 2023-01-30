const User = require("../models/user");

const getAllUsers = async (pageSize, page) =>
  await User.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .sort("login");

const countUsers = async () => await User.count();
const getUserById = async (id) => await User.findById(id);

const deleteAllUsers = async () => await User.deleteMany({});

const deleteUserById = async (id) => await User.findByIdAndDelete(id);

module.exports = {
  countUsers,
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById,
};
