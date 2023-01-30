const { header, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../../config");

const accessTokenValidation = [
  header("authorization")
    .exists()
    .withMessage("No jwt token")
    .isJWT()
    .custom((value) => jwt.verify(value, JWT_SECRET_KEY)),
];

const refreshTokenValidation = [
  check("refreshToken")
    .exists()
    .withMessage("No jwt token")
    .isJWT()
    .custom((value) => jwt.verify(value, JWT_SECRET_KEY)),
];

module.exports = {
  accessTokenValidation,
  refreshTokenValidation,
};
