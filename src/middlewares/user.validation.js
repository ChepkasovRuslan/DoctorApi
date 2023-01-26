const { check } = require("express-validator");
const User = require("../models/user");

const userValidation = [
  check("login")
    .exists()
    .withMessage(`Object must contain "login" field`)
    .custom(async (value) => {
      const users = await User.find({ login: value });
      if (users.length <= 0) {
        return Promise.resolve();
      }

      return Promise.reject();
    })
    .withMessage("Login already exists")
    .isString()
    .withMessage("Login must be a string")
    .isLength({ min: 6, max: 50 })
    .withMessage("Login length must be more than 6 and less than 50")
    .custom((value) => !/\s/.test(value))
    .withMessage("No spaces are allowed in the login")
    .matches(/^[A-Za-z0-9(),-_.,]+$/)
    .withMessage("Login must contain latin only characters"),

  check("password")
    .exists()
    .withMessage(`Object must contain "password" field`)
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password length must be more than 6 and less than 50")
    .custom((value) => !/\s/.test(value))
    .withMessage("No spaces are allowed in the password")
    .matches(/^[A-Za-z(),-_.,]+$/)
    .withMessage("Password must contain latin only characters")
    .custom((value) => /[0-9]/.test(value))
    .withMessage("Password must contain at least 1 number"),

  check("confirmedPassword", "Passwords do not match")
    .exists()
    .custom((value, { req }) => value === req.body.password),
];

module.exports = {
  userValidation,
};
