const User = require("../models/user");

const getAllUsers = async () => await User.find();

const getUserById = async (id) => await User.findById(id);

const registerUser = async (body) => {
  return await User.create({
    login: body.login,
    password: body.password,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
};
