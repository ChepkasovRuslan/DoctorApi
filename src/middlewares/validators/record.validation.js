const { check } = require("express-validator");

const recordValidation = [
  check("patientFullName")
    .exists()
    .trim()
    .isEmpty()
    .withMessage(`Object must contain "patientFullName" field`)
    .isString()
    .withMessage("PatientFullName must be a string")

    .matches(/^[a-z ,.'-]+$/i)
    .withMessage("Invalid string format"),

  check("receptionDate")
    .exists()
    .trim()
    .withMessage(`Object must contain "receptionDate" field`)
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),

  check("complaints")
    .exists()
    .trim()
    .isEmpty()
    .withMessage(`Object must contain "complaints" field`)
    .isString()
    .withMessage("Complaints must be a string"),
];

module.exports = {
  recordValidation,
};
