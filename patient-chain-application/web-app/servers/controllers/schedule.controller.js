import Response from "../models/response.model.js";
import ScheduleModel from "../models/schedule.model.js";

export default class ScheduleController {
  static async getScheduleOfPatient(req, res) {
    try {
      const { userId } = req.locals;
      const schedule = new ScheduleModel();
      const events = await schedule.getScheduleByPatientId(userId);
      res
        .status(200)
        .json(
          new Response(102, "The schedules is executed successfully !", { isSuccessfull: true, events })
        );
    } catch (error) {
      res
        .status(500)
        .json(
          new Response(102, error?.message || "Internal server !", { isSuccessfull: false })
        );
    }
  }

  static async getScheduleOfDoctor(req, res) {
    try {
      const { userId } = req.locals;
      const schedule = new ScheduleModel();
      const events = await schedule.getScheduleByDoctorId(userId);

      res
        .status(200)
        .json(
          new Response(102, "The schedules is executed successfully !", { isSuccessfull: true, events })
        );
    } catch (error) {
      res
        .status(500)
        .json(
          new Response(102, error?.message || "Internal server !", { isSuccessfull: false })
        );
    }
  }

  static async addSchedule(req, res) {
    try {
      const { userId } = req.locals;
      const { patientId, time, note } = req.body;
      const schedule = new ScheduleModel();
      const id = await schedule.add({
        patientId,
        time,
        note,
        doctorId: userId
      });

      res
        .status(200)
        .json(
          new Response(102, "The schedules is executed successfully !", { isSuccessfull: true, scheduleId: id })
        );
    } catch (error) {
      res
        .status(500)
        .json(
          new Response(102, error?.message || "Internal server !", { isSuccessfull: false })
        );
    }
  }
}
