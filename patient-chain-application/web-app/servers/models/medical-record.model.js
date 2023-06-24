import { database } from "../databases/firebase.database.js";

export default class MedicalRecordModel {
    constructor() {
        this.ref = database.ref("/medical-records");
    }

    async getRecordByUserId(userId) {
        const raw = await database.ref(`users/${userId}/medical_record/exams`).once("value");
        const data = raw.val();
        const records = [];

        for (const key in data) if (data?.[key]) records.push(data?.[key]);

        return records;
    }
}