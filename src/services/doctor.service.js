const Doctor = require("../models/doctor");

const getAllDoctors = async () => await Doctor.find();

const getDoctorById = async (id) => await Doctor.findById(id);

const createDoctor = async (body) => {
  return await Doctor.create({
    fullName: body.fullName,
  });
};

const updateDoctorById = async (id, body) =>
  await Doctor.findByIdAndUpdate(id, body);

const deleteAllDoctors = async () => await Doctor.deleteMany({});

const deleteDoctorById = async (id) => await Doctor.findByIdAndDelete(id);

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctorById,
  deleteAllDoctors,
  deleteDoctorById,
};
