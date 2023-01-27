const { param } = require("express-validator");

const idValidation = [param("id").isMongoId().withMessage("Invalid id")];

module.exports = {
  idValidation,
};
