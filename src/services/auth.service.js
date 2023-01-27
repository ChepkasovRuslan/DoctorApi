const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../config");

const getUserByLogin = async (login) => await User.findOne({ login: login });

const checkExistingUser = async (login) => await User.exists({ login: login });

const registerUser = async (body) => {
  return await User.create({
    login: body.login,
    password: body.password,
  });
};

const generateTokens = (user) => {
  const accessToken = jwt.sign(user.toJSON(), JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 10, // 10 min
  });
  const refreshToken = jwt.sign(user.toJSON(), JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 15, // 15 min
  });

  return { accessToken: accessToken, refreshToken: refreshToken };
};

module.exports = {
  getUserByLogin,
  checkExistingUser,
  registerUser,
  generateTokens,
};
