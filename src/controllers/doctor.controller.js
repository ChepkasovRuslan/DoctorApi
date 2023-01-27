const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctorById,
  deleteAllDoctors,
  deleteDoctorById,
} = require("../services/doctor.service");
const { validationResult } = require("express-validator");

const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();

    if (doctors.length) res.status(200).send(doctors);
    else res.status(404).json({ msg: "Doctors not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getDoctor = async (req, res) => {
  try {
    const user = await getDoctorById(req.params.id);

    if (user) res.status(200).send(user);
    else res.status(404).json({ msg: "Doctor not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const postDoctor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const doctor = await createDoctor(req.body);

    res.status(201).send(doctor);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const patchDoctor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const patchedDoctor = await updateDoctorById(req.params.id, req.body);

    res.status(201).send(patchedDoctor);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteDoctors = async (req, res) => {
  try {
    const deletedDoctors = await deleteAllDoctors();

    if (deletedDoctors.deletedCount) res.status(202).send(deletedDoctors);
    else res.status(404).json({ msg: "Doctors not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await deleteDoctorById(req.params.id);

    if (deletedDoctor) res.status(202).send(deletedDoctor);
    else res.status(404).json({ msg: "Doctor not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctor,
  postDoctor,
  patchDoctor,
  deleteDoctors,
  deleteDoctor,
};
