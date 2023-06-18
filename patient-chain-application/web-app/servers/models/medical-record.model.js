import { database } from "../databases/firebase.database.js";

export default class MedicalRecordModel {
    constructor() {
        this.ref = database.ref("/medical-records");
    }

}