import express from "express";
import userRouter from "./routes/user.routes.js";
import medicalRecordRouter from "./routes/medical-record.routes.js";
import { configLibraries } from "./configs/lib.config.js";
import UserController from "./controllers/user.controller.js";
import { authenticate } from "./middlewares/authentication.middlewares.js";

const app = express();

/** Config libraries */
configLibraries(app);
app.use(authenticate);
app.use("/api", userRouter);
app.use("/api", medicalRecordRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("`Server running");
});

// dang ky admin cho moi to chuc
// await UserController.enrollAdmin(null, "doctor");
// await UserController.enrollAdmin(null, "patient");

