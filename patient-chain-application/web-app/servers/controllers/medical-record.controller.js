import { database } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";
import fabricDoctor from "../fabric/doctor.fabric.js";
import crypto from 'crypto';
import MedicalRecordModel from "../models/medical-record.model.js";
import UserModel from "../models/user.model.js";

export default class MedicalRecordController {
  static async createRecord(req, res) {
    try {
      const medical = new MedicalRecordModel();
      const user = new UserModel();
      const {
        diagnoseDisease,
        symptom,
        treatment,
        emailDoctor,
        pill,
        quantity,
        timeperday,
        dayofsurgery,
        note,
        medicalExamDay
      } = req.body;

      const { userId, recordId } = req.params;

      const medicalRecord = {
        diagnoseDisease,
        symptom,
        treatment,
        emailDoctor,
        pill,
        quantity,
        timeperday,
        dayofsurgery,
        note,
        medicalExamDay
      };

      const isFirst = await user.hasExamined(userId);

      if (!isFirst) {
        await database.ref(`users/${userId}/medical_record/exams`).push(medicalRecord);
        res.status(200).json(medicalRecord);

        const hash = medicalRecord?.diagnoseDisease.toString() + medicalRecord?.treatment.toString();
        let hashBC = crypto.createHash("sha256").update(hash.toString()).digest("hex");
        await fabricDoctor.createRecord(recordId, hashBC, req.locals.userId);

      } else {
        // get hash code from firebase
        let oldMedicalRecord = await medical.getRecordByUserId(userId);
        let hash = '';
        for (const record of oldMedicalRecord) {
          hash += record?.diagnoseDisease.toString() + record?.treatment.toString();
        }
        let hashFB = crypto.createHash("sha256").update(hash.toString()).digest("hex");

        // get hash code from blockchain
        let record = await fabricDoctor.getRecord(recordId, req.locals.userId);
        if (JSON.parse(record)?.HashCode === hashFB) {
          // console.log("trung khop");
          await database.ref(`users/${userId}/medical_record/exams`).push(medicalRecord);
          res.status(200).json(medicalRecord);

          // new hash code
          let newhash = hash + medicalRecord?.diagnoseDisease.toString() + medicalRecord?.treatment.toString();
          let hashBC = crypto.createHash("sha256").update(newhash.toString()).digest("hex");

          // add blockchain
          await fabricDoctor.updateRecord(recordId, hashBC, req.locals.userId);
        } else{
          console.log("khong trung khop");
        }
      }
    } catch (error) {
      res.status(500).json(new Response(102, "error", { isSuccessfull: false }));
    }
  }

  static async getRecord(req, res) {
    try {
      const medical = new MedicalRecordModel();
      const info = new UserModel();
      const { userId } = req.params;
      const records = await medical.getRecordByUserId(userId);
      const user = await info.findUser(userId);

      res
        .status(200)
        .json(new Response(102, "success", { isSuccessfull: true, records, user }));
    } catch (error) {
      res
        .status(500)
        .json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }));
    }

  }
}   