const { logError } = require("./logger.service");
const checkErrors = (errors) => {
  if (!errors.isEmpty()) {
    if (errors.array().some((e) => e.location === "headers")) {
      return 401;
    }

    logError(errors);
    return 400;
  }
  return null;
};

module.exports = {
  checkErrors,
};
