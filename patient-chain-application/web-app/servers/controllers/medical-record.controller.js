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
        createAt,
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
        createAt,
        pill,
        quantity,
        timeperday,
        dayofsurgery,
      };

      let data = await database.ref(`users/${userId}/records`).push(medicalRecord);
      // hash data
      let hashcode = crypto.createHash("sha256").update(JSON.stringify(medicalRecord)).digest("sha256");
      console.log("hashcode: ", hashcode);
      // get recordId, identity:userId
      let recordId = data.key;
      let identity = "-NYJ-YLjXqYLjuLIj3_0";
      // add blockchain
      await fabricDoctor.createRecord(recordId, hashcode, identity)

      res.status(200).json(medicalRecord);
    } catch (error) {
      res.status(500).json(medicalRecord);
    }
  }

  static async getRecord(req, res) {
    let { userId } = req.params;
    let data = await database.ref(`users/${userId}/records`).once("value");
    let raws = data.val();
    let records = [];

    for (let key in raws) {
      let raw = raws[key];
      if (key) {
        records.push({ ...raw, userId: key });
      }
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