const log = require("log-to-file");

const FILE_NAME = "doctor_api.log";

const logInfo = (message) => log(`[INFO]: ${message}`, FILE_NAME);

const logError = (message) => log(`[ERROR]: ${message}`, FILE_NAME);

module.exports = {
  logInfo,
  logError,
};
