import { database } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";
import fabricDoctor from "../fabric/doctor.fabric.js";

export default class MedicalRecordController {
  static async createRecord(req, res) {
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

      const { userId } = req.params;

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

      await database.ref(`users/${userId}/records`).push(medicalRecord);

      res.status(200).json(new Response(102, "ok", { isSuccessfull: true }));
    } catch (error) {
      res.status(500).json(new Response(102, error?.message || "Error server", { isSuccessfull: false }));
    }
  }

  static async getRecord(req, res) {
    const { userId } = req.params;

    const data = await database.ref(`users/${userId}/records`).once("value");
    const raws = data.val();
    const records = [];
    console.log("abcccc", records);
    for (const key in raws) {
      const raw = raws[key];
      if (key) {
        records.push({ ...raw, userId: key });
      }
    }
  }

  static async create(data, identity) {
    // add database

    // hash data
    const hash = "asdasugdasudga"
    // add blockchain
    const recordId = data.id
    await fabricDoctor.createRecord(recordId, hash, identity)

  }

  static async update(data, identity) {
    // add database

    // hash data
    const hash = "fj0j0ed90qjd9qw0j0q9"
    // add blockchain
    const recordId = data.id
    await fabricDoctor.updateRecord(recordId, hash, identity)
  }

  static async get(recordId, identity) {
    // get blockchain
    const record = await fabricDoctor.getRecord(recordId, identity)
    return record
  }

}   