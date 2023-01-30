const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
  patientFullName: {
    type: String,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  receptionDate: {
    type: String,
    required: true,
  },
  complaints: {
    type: String,
    required: true,
  },
});

recordSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

module.exports = Record = mongoose.model("record", recordSchema);
