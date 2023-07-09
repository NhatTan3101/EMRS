import express from "express";
import userRouter from "./routes/user.route.js";
import medicalRecordRouter from "./routes/medical-record.route.js";
import scheduleRouter from "./routes/schedule.route.js";
import { configLibraries } from "./configs/lib.config.js";
import { authenticate } from "./middlewares/authentication.middlewares.js";
import UserController from "./controllers/user.controller.js";


const app = express();

/** Config libraries */
configLibraries(app);

app.use(authenticate);
app.use("/api", scheduleRouter);
app.use("/api", userRouter);
app.use("/api", medicalRecordRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Back to school");
});

// dang ky admin cho moi to chuc
await UserController.enrollAdmin(null, "doctor");
await UserController.enrollAdmin(null, "patient");

