const {
  checkExistingUser,
  getUserByLogin,
  registerUser,
} = require("../services/auth.service");
const { validationResult } = require("express-validator");
const { JWT_SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");

const postNewUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (await checkExistingUser(req.body.login)) {
      return res.status(409).json({ msg: "Login already exists" });
    }

    const jwtSecretKey = JWT_SECRET_KEY;
    const user = await registerUser(req.body);
    const accessToken = jwt.sign(user.toJSON(), jwtSecretKey, {
      expiresIn: 60 * 60 * 10,
    });
    const refreshToken = jwt.sign(user.toJSON(), jwtSecretKey, {
      expiresIn: 60 * 60 * 15,
    });

    res.status(201).json({ accessToken: accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const authorizeUser = async (req, res) => {
  try {
    const user = await getUserByLogin(req.body.login);

    if (user) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err;

        isMatch
          ? res.status(200).json({ login: user.login })
          : res.status(403).json({ msg: "Invalid password" });
      });
    } else res.status(404).json({ msg: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  postNewUser,
  authorizeUser,
};
