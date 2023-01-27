const express = require("express");
const doctorCtrl = require("../controllers/doctor.controller");
const {
  doctorValidation,
} = require("../middlewares/validators/doctor.validation");

const doctorRouter = express.Router();

doctorRouter.get("/doctors", doctorCtrl.getDoctors);
doctorRouter.get("/doctor/:id", doctorCtrl.getDoctor);
doctorRouter.post("/doctor", doctorValidation, doctorCtrl.postDoctor);
doctorRouter.patch("/doctor/:id", doctorValidation, doctorCtrl.patchDoctor);
doctorRouter.delete("/doctors", doctorCtrl.deleteDoctors);
doctorRouter.delete("/doctor/:id", doctorCtrl.deleteDoctor);

module.exports = doctorRouter;
