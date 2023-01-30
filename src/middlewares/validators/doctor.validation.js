const { check } = require("express-validator");

const doctorValidation = [
  check("fullName")
    .exists()
    .withMessage(`Object must contain "fullName" field`)
    .isString()
    .withMessage("FullName must be a string")
    .matches(/^[a-z ,.'-]+$/i)
    .withMessage("Invalid string format"),
];

module.exports = {
  doctorValidation,
};
