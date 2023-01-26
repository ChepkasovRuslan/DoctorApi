const User = require("../models/user");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const registerUser = async (body) => {
  const user = await User.create({
    login: body.login,
    password: bcrypt.hash(body.password, SALT_WORK_FACTOR),
  });

  console.log(user);

  return user;
};

module.exports = {
  registerUser,
};
