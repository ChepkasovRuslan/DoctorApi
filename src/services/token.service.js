const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../config");

const generateTokens = (id) => {
  const accessToken = jwt.sign({ id: id }, JWT_SECRET_KEY, {
    expiresIn: 120,
  });
  const refreshToken = jwt.sign({ id: id }, JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 15,
  });

  return { accessToken: accessToken, refreshToken: refreshToken };
};

const refreshTokens = async (token) => {
  const decoded = jwt.verify(token, JWT_SECRET_KEY);

  return generateTokens(decoded.id);
};

module.exports = {
  generateTokens,
  refreshTokens,
};
