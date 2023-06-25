import { database } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";
import fabricDoctor from "../fabric/doctor.fabric.js";
import crypto from 'crypto';
import MedicalRecordModel from "../models/medical-record.model.js";

export default class MedicalRecordController {
  static async createRecord(req, res) {
    try {
      const medical = new MedicalRecordModel();
      const {
        diagnoseDisease,
        symptom,
        treatment,
        doctor,
        emailDoctor,
        medicalExamDay,
        pill,
        quantity,
        timeperday,
        dayofsurgery,
      } = req.body;

      const { userId, recordId } = req.params;

      const medicalRecord = {
        diagnoseDisease,
        symptom,
        treatment,
        doctor,
        emailDoctor,
        medicalExamDay,
        pill,
        quantity,
        timeperday,
        dayofsurgery,
      };

      try {
        let hashtoBC = "";
        await fabricDoctor.createRecord(recordId, hashtoBC, req.locals.userId);
      } catch (error) {
      }
      const recordInformation = await fabricDoctor.getRecord(recordId, req.locals.userId);
      const record = JSON.parse(recordInformation);

      let oldMedicalRecord = medical.getRecordByUserId(userId);
      let hash = crypto.createHash("sha256").update(JSON.stringify(oldMedicalRecord)).digest("sha256");
      if (record?.HashCode === "hash" || record?.HashCode === "") {

        // // push new data to firebase
        await database.ref(`users/${userId}/medical_record/exams`).push(medicalRecord);
        res.status(200).json(medicalRecord);

        // // get lại data từ firebase để hash
        let newMedicalRecord = medical.getRecordByUserId(userId);
        let hashtoBC1 = crypto.createHash("sha256").update(JSON.stringify(newMedicalRecord)).digest("sha256");
        // // add blockchain

        await fabricDoctor.updateRecord(recordId, hashtoBC1, req.locals.userId);
    }
    } catch (error) {
      res.status(500).json(new Response(102, "error", { isSuccessfull: false }));
    }
  }

  static async getRecord(req, res) {
    try {
      const medical = new MedicalRecordModel();
      const { userId } = req.params;
      const records = await medical.getRecordByUserId(userId);

      res
        .status(200)
        .json(new Response(102, "success", { isSuccessfull: true, records }));
    } catch (error) {
      res
        .status(500)
        .json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }));
    }

  }
}   