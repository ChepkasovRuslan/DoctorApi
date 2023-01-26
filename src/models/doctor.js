const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
});

module.exports = User = mongoose.model("doctor", userSchema);
