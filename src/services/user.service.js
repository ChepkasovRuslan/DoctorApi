const User = require("../models/user");

const registerUser = async (body) => {
  return await User.create({
    login: body.login,
    password: body.password,
  });
};

module.exports = {
  registerUser,
};
