const express = require("express");
const recordCtrl = require("../controllers/record.controller");
const {
  recordValidation,
} = require("../middlewares/validators/record.validation");

const recordRouter = express.Router();

recordRouter.get("/records", recordCtrl.getRecords);
recordRouter.get("/record/:id", recordCtrl.getRecord);
recordRouter.post("/record", recordValidation, recordCtrl.postRecord);
recordRouter.patch("/record/:id", recordValidation, recordCtrl.patchRecord);
recordRouter.delete("/records", recordCtrl.deleteRecords);
recordRouter.delete("/record/:id", recordCtrl.deleteRecord);

module.exports = recordRouter;
