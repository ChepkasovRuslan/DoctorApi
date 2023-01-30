require("dotenv").config();

const PORT = process.env.PORT || 5000;
const DB_CONNECTION = process.env.DB_CONNECTION;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_HEADER_KEY = process.env.TOKEN_HEADER_KEY;

module.exports = { PORT, DB_CONNECTION, JWT_SECRET_KEY, TOKEN_HEADER_KEY };
