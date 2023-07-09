import { database } from "../databases/firebase.database.js";
import UserModel from "./user.model.js";

export default class ScheduleModel {
    constructor() {
        this.ref = database.ref("schedules");
    }

    async getScheduleByPatientId(patientId) {
        const user = new UserModel();
        const users = await user.findUsers();
        const raw = await this.ref.once("value");
        const data = raw.val();
        const records = [];

        for (const key in data) {
            const element = data?.[key];
            if (element && element?.patientId == patientId) {
                const doctor = users.find((item) => item?.userId === element?.doctorId);
                records.push({ ...element, scheduleId: key, doctorName: doctor?.name });
            }
        }

        return records;
    }

    async getScheduleByDoctorId(doctorId) {
        const user = new UserModel();
        const users = await user.findUsers();
        const raw = await this.ref.once("value");
        const data = raw.val();
        const records = [];

        for (const key in data) {
            const element = data?.[key];
            if (element && element?.doctorId == doctorId) {
                const patient = users.find((item) => item?.userId === element?.patientId);
                records.push({ ...element, scheduleId: key, patientName: patient?.name });
            }
        }

        return records;
    }

    async add(schedule) {
        const data = await this.ref.push(schedule);

        return data.key;
    }
}