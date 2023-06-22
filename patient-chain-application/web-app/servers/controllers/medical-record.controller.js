import { database } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";
import fabricDoctor from "../fabric/doctor.fabric.js";
import crypto from 'crypto';

export default class MedicalRecordController {
  static async createRecord(req, res) {
    // add database
    try {
      var {
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

      let { userId } = req.params;

      var medicalRecord = {
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

      await database.ref(`users/${userId}/medical_record/exams`).push(medicalRecord);
      // hash data
      let hashcode = crypto.createHash("sha256").update(JSON.stringify(medicalRecord)).digest("sha256");
      // // get recordId, identity:userId
      let recordId = data.key;
      let identity = req.locals.userId;
      // // add blockchain
      let dataBC = await fabricDoctor.createRecord(recordId, hashcode, identity);

      res.status(200).json(medicalRecord);
    } catch (error) {
      res.status(500).json(medicalRecord);
    }
  }

  static async getRecord(req, res) {
    let { userId } = req.params;
    const raw = await database.ref(`users/${userId}/medical_records/exams`).once("value");
    const data = raw.val();
    let records = [];

    for (const key in data) {
      if (data?.[key]) records.push(data?.[key]);
    }
    res
      .status(200)
      .json(new Response(102, "error", { isSuccessfull: true, records }));
  }

  static async update(data, identity) {
    // check
    // get hashcode from blockchain
    let record = await fabricDoctor.getRecord(recordId, identity)
    // add database

    // hash data
    let hash = "fj0j0ed90qjd9qw0j0q9"
    // add blockchain
    let recordId = data.id
    await fabricDoctor.updateRecord(recordId, hash, identity)
  }

  // static async get(recordId, identity) {
  //   // get blockchain
  //   let record = await fabricDoctor.getRecord(recordId, identity)
  //   return record
  // }

}   