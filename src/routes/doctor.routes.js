const express = require("express");
const doctorCtrl = require("../controllers/doctor.controller");
const { doctorValidation } = require("../middlewares/doctor.validation");

const doctorRouter = express.Router();

doctorRouter.get("/doctors", doctorCtrl.getDoctors);
doctorRouter.get("/doctors/id/:id", doctorCtrl.getDoctor);
doctorRouter.post("/doctors", doctorValidation, doctorCtrl.postDoctor);
doctorRouter.patch("/doctors/id/:id", doctorValidation, doctorCtrl.patchDoctor);
doctorRouter.delete("/doctors", doctorCtrl.deleteDoctors);
doctorRouter.delete("/doctors/id/:id", doctorCtrl.deleteDoctor);

module.exports = doctorRouter;
