const {
  checkExistingUser,
  getUserByLogin,
  registerUser,
} = require("../services/auth.service");
const { generateTokens } = require("../services/token.service");
const { validationResult } = require("express-validator");
const { logError } = require("../services/logger.service");

const registerNewUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    if (await checkExistingUser(req.body.login)) {
      return res.status(409).json({ msg: "Login already exists" });
    }

    const user = await registerUser(req.body);

    const tokens = generateTokens(user.id);
    res.status(201).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const authorizeUser = async (req, res) => {
  try {
    const user = await getUserByLogin(req.body.login);

    if (user) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;

        const tokens = generateTokens(user.id);

        isMatch
          ? res.status(200).json({
              login: user.login,
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            })
          : res.status(403).json({ msg: "Invalid password" });
      });
    } else res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

module.exports = {
  registerNewUser,
  authorizeUser,
};
