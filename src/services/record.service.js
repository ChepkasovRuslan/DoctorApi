const Record = require("../models/record");
const Doctor = require("../models/doctor");

const getAllRecords = async (pageSize, page, sortOption, sortDirection) =>
  await Record.find()
    .populate({
      path: "doctor",
      model: Doctor,
    })
    .sort([[sortOption, sortDirection]])
    .limit(pageSize)
    .skip((page - 1) * pageSize);

const countRecords = async () => await Record.count();

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
  countRecords,
  getRecordById,
  createRecord,
  updateRecordById,
  deleteAllRecords,
  deleteRecordById,
};
