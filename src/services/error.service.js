const checkErrors = (errors, res) => {
  if (!errors.isEmpty()) {
    if (errors.array().some((e) => e.location === "headers")) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {
  checkErrors,
};
