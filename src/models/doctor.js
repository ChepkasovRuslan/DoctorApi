const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
});

doctorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = Doctor = mongoose.model("doctor", doctorSchema);
