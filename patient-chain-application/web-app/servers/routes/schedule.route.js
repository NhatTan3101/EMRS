import express from "express";
import ScheduleController from "../controllers/schedule.controller.js";

const router = express.Router();

router.post('/schedule', ScheduleController.addSchedule);
router.get('/schedule/patient', ScheduleController.getScheduleOfPatient);
router.get('/schedule/doctor', ScheduleController.getScheduleOfDoctor);

export default router;