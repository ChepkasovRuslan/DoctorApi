const { refreshTokens } = require("../services/token.service");
const { validationResult } = require("express-validator");
const { logError } = require("../services/logger.service");

const refreshToken = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }

    const tokens = await refreshTokens(req.body.refreshToken);

    res.status(201).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

module.exports = {
  refreshToken,
};
