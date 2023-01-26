const { registerUser } = require("../services/user.service");
const { validationResult } = require("express-validator");
const { JWT_SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");

const postNewUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
    res.status(500).send(error);
    console.log(error);
  }
};

module.exports = {
  postNewUser,
};
