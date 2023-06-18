import { database } from "../databases/firebase.database.js";
import ResponseError from "../models/response-error.model.js";
import Response from "../models/response.model.js";
import UserModel from "../models/user.model.js";
import fabricAdmin from "../fabric/admin.fabric.js"

export default class UserController {
  static async login(req, res) {
    const model = new UserModel();

    console.log(req.body.email, req.body.password);
    const result = await model.findUser(req.body.email, req.body.password);
    /** Response data */
    res.status(200).json({
      code: 10201,
      message: "Successfully",
      result,
    });
  }

  static async register(req, res) {
    var { email, name, password, role } = req.body;

    var user = {
      email,
      name,
      password,
      role,
    };

    await database.ref("users/").push(user);

    res.status(200).json(new Response(102, "error", { isSuccessfull: true }));
  }

  static async update(req, res) {
    const { mabhyt } = req.body;
    const { userId } = req.params;

    const user = {
      mabhyt,
    };

    await database.ref(`users/${userId}`).update(user);

    res.status(200).json(new Response(102, "error", { isSuccessfull: true }));
  }

  static async getUser(req, res) {
    const { userId } = req.params;

    await database.ref(`users/${userId}`).get(user);

    res.status(200).json(new Response(102, "error", { isSuccessfull: true }));
  }

  static async search(req, res) {
    const model = new UserModel();
    const { mabhyt } = req.query;

    const users = await model.findUsers(mabhyt);

    res.status(200).json(new Response(102, "error", { isSuccessfull: true, users }));
  }


  static async enrollAdmin(user, organization) {
    // add database

    // enroll to Fabric
    await fabricAdmin.enrollAdmin(organization, "admin")
  }

  static async enrollUser(user, organization) {
    // add database

    // enroll to Fabric
    await fabricAdmin.registerUser(organization, user.id)
  }
}