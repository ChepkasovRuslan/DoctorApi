const express = require("express");
const {
  refreshTokenValidation,
} = require("../middlewares/validators/token.validation");
const { refreshToken } = require("../controllers/token.controller");

const tokenRouter = express.Router();

tokenRouter.post("/token/refresh", refreshTokenValidation, refreshToken);

module.exports = tokenRouter;
