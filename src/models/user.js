const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = User = mongoose.model("user", userSchema);
