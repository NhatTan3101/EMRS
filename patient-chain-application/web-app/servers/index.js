import express from "express";
import userRouter from "./routes/user.routes.js";
import medicalRecordRouter from "./routes/medical-record.routes.js";
import { configLibraries } from "./configs/lib.config.js";
import UserController from "./controllers/user.controller.js";
import ReocordController from "./controllers/medical-record.controller.js";

const app = express();

/** Config libraries */
configLibraries(app);

app.use("/api", userRouter);
app.use("/api", medicalRecordRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("`Server running");
});

// dang ky admin cho moi to chuc
// await UserController.enrollAdmin(null, "doctor");
// await UserController.enrollAdmin(null, "patient");

// dang ki tai khoan + add blockchain
// lay id cua fisebase de tao identity cho blockchain
// await UserController.enrollUser(
//     {
//         id: "0323jf3j",
//     },
//     "doctor"
// );

// await UserController.enrollUser(
//     {
//         id: "240akfk",
//     },
//     "patient"
// );

// invoke (post) 

// await ReocordController.create({id: "Record 1", name: "Benh Nhan"}, "0323jf3j")

// await ReocordController.update({id: "Record 1", name: "Benh Nhan Moi"}, "0323jf3j")

// query (get)

console.log(JSON.parse(await ReocordController.get("Record 1", "240akfk")).HashCode)
