const User = require("../models/user");

const getAllUsers = async () => await User.find();

const registerUser = async (body) => {
  return await User.create({
    login: body.login,
    password: body.password,
  });
};

module.exports = {
  getAllUsers,
  registerUser,
};
