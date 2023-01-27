const User = require("../models/user");
const getUserByLogin = async (login) => await User.findOne({ login: login });

const checkExistingUser = async (login) => await User.exists({ login: login });

const registerUser = async (body) => {
  return await User.create({
    login: body.login,
    password: body.password,
  });
};

module.exports = {
  getUserByLogin,
  checkExistingUser,
  registerUser,
};
