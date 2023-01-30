const { check } = require("express-validator");

const recordValidation = [
  check("patientFullName")
    .exists()
    .withMessage(`Object must contain "patientFullName" field`)
    .isString()
    .withMessage("PatientFullName must be a string")
    .matches(/^[a-z ,.'-]+$/i)
    .withMessage("Invalid string format"),

  check("receptionDate")
    .exists()
    .withMessage(`Object must contain "receptionDate" field`)
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),

  check("complaints")
    .exists()
    .withMessage(`Object must contain "complaints" field`)
    .isString()
    .withMessage("Complaints must be a string"),
];

module.exports = {
  recordValidation,
};
