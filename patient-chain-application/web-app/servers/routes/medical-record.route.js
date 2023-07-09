import express from "express";
import MedicalRecordController from "../controllers/medical-record.controller.js";

const router = express.Router();

router.post('/medical-records/:userId/:recordId', MedicalRecordController.createRecord);
router.get('/medical-records/:userId', MedicalRecordController.getRecord);

export default router;