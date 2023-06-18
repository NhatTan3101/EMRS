import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

export function configLibraries(app) {
  dotenv.config({ path: './.env' });
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}