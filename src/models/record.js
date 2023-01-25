const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new Schema({
  patientFullName: {
    type: String,
    required: true,
  },
  doctorFullName: {
    type: String,
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

module.exports = Record = mongoose.model("records", recordSchema);
