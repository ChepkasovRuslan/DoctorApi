const {
  getAllRecords,
  countRecords,
  getRecordById,
  createRecord,
  updateRecordById,
  deleteAllRecords,
  deleteRecordById,
} = require("../services/record.service");
const { checkDoctorExists } = require("../services/doctor.service");
const { validationResult } = require("express-validator");
const { logError } = require("../services/logger.service");

const getRecords = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const records = await getAllRecords(
      req.query.pageSize,
      req.query.page,
      req.query.sort,
      req.query.startDate,
      req.query.endDate
    );
    const total = await countRecords();

    res.status(200).json({
      content: records,
      page: req.query.page,
      pageSize: req.query.pageSize,
      elementsOnPage: records.length,
      totalCountOfElements: total,
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const getRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const record = await getRecordById(req.params.id);
    console.log(record);

    if (record) res.status(200).send(record);
    else res.status(404).json({ msg: "Record not found" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const postRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!(await checkDoctorExists(req.body.doctor))) {
      return res.status(404).json({ errors: "Doctor not found" });
    }

    const record = await createRecord(req.body);

    res.status(201).send(record);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const patchRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!(await checkDoctorExists(req.body.doctor))) {
      return res.status(404).json({ errors: "Doctor not found" });
    }

    const patchedRecord = await updateRecordById(req.params.id, req.body);

    res.status(201).send(patchedRecord);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const deleteRecords = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deletedRecords = await deleteAllRecords();

    if (deletedRecords.deletedCount) res.status(202).send(deletedRecords);
    else res.status(404).json({ msg: "Doctors not found" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

const deleteRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deletedRecord = await deleteRecordById(req.params.id);

    if (deletedRecord) res.status(202).send(deletedRecord);
    else res.status(404).json({ msg: "Doctor not found" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    logError(error.message);
  }
};

module.exports = {
  getRecords,
  getRecord,
  postRecord,
  patchRecord,
  deleteRecords,
  deleteRecord,
};
