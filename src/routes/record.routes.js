const express = require("express");
const recordCtrl = require("../controllers/record.controller");
const {
  recordValidation,
} = require("../middlewares/validators/record.validation");
const {
  accessTokenValidation,
} = require("../middlewares/validators/token.validation");

const recordRouter = express.Router();

recordRouter.get("/records", accessTokenValidation, recordCtrl.getRecords);
recordRouter.get("/record/:id", accessTokenValidation, recordCtrl.getRecord);
recordRouter.post(
  "/record",
  recordValidation,
  accessTokenValidation,
  recordCtrl.postRecord
);
recordRouter.patch(
  "/record/:id",
  recordValidation,
  accessTokenValidation,
  recordCtrl.patchRecord
);
recordRouter.delete(
  "/records",
  accessTokenValidation,
  recordCtrl.deleteRecords
);
recordRouter.delete(
  "/record/:id",
  accessTokenValidation,
  recordCtrl.deleteRecord
);

module.exports = recordRouter;
