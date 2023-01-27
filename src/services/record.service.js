const Record = require("../models/record");

const getAllRecords = async () =>
  await Record.find().limit(10).sort("receptionDate");

const getRecordById = async (id) => await Record.findById(id);

const createRecord = async (body) => {
  return await Record.create({
    patientFullName: body.patientFullName,
    doctor: body.doctor,
    receptionDate: body.receptionDate,
    complaints: body.complaints,
  });
};

const updateRecordById = async (id, body) =>
  await Record.findByIdAndUpdate(id, body);

const deleteAllRecords = async () => await Record.deleteMany({});

const deleteRecordById = async (id) => await Record.findByIdAndDelete(id);

module.exports = {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecordById,
  deleteAllRecords,
  deleteRecordById,
};
