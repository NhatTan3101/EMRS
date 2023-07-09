import { upload, createUser, database, generateAccessToken, signIn } from "../databases/firebase.database.js";
import Response from "../models/response.model.js";
import UserModel from "../models/user.model.js";
import fabricAdmin from "../fabric/admin.fabric.js";
import { generateId } from "../utils/uuid.util.js";

export default class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const model = new UserModel();
      const { userId } = await signIn(email, password);

      const result = await model.findUser(userId);

      const accessToken = await generateAccessToken(userId, { recordId: result?.medical_record?.recordId });

      /** Response data */
      res.status(200).json({
        code: 10201,
        message: "Successfully",
        result: {
          accessToken,
          userId,
          name: result?.name,
          role: result?.role,
          email: result?.email,
          gender: result?.gender,
          address: result?.address,
          hospital: result?.hospital,
          department: result?.department,
          phonenumber: result?.phonenumber,
          mabhyt: result?.mabhyt,
          idcardno: result?.idcardno,
          birthday: result?.birthday,
          hometown: result?.hometown,
          nation: result?.nation,
        },
      });
    } catch (error) {
      /** Response data */
      res.status(500).json({
        code: 10201,
        message: error?.message || "Internal server !",
      });
    }
  }

  static async register(req, res) {
    try {
      const { email, name, password, role } = req.body;
      const user = {
        email,
        name,
        role,
        medical_record: {
          recordId: generateId(),
        }
      };

      const data = await createUser(email, password);

      await database.ref("users").child(data.uid).update(user);

      res.status(200).json(new Response(102, "Successfully", { isSuccessfull: true }));

      await fabricAdmin.registerUser(user.role, data.uid);

    } catch (error) {
      res.status(500).json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }));
    }
  }

  static async updatePatient(req, res) {
    try {
      const { mabhyt, gender, idcardno, address, birthday, hometown, nation, phonenumber } = req.body;
      const { userId } = req.params;

      const user = {
        mabhyt, gender, idcardno, address, birthday, hometown, nation, phonenumber
      };

      await database.ref(`users/${userId}`).update(user);

      res.status(200).json(new Response(102, "success", { isSuccessfull: true }))
    } catch (error) {
      res.status(500).json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }))
    }
  };

  static async updateDoctor(req, res) {
    try {
      const { gender, address, hospital, department, phonenumber } = req.body;
      const { userId } = req.params;

      const user = {
        gender, address, hospital, department, phonenumber
      };

      await database.ref(`users/${userId}`).update(user);

      res.status(200).json(new Response(102, "success", { isSuccessfull: true }));
    } catch (error) {
      res.status(500).json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }))
    }
  }

  static async getUser(req, res) {
    try {
      const { userId } = req.params;

      await database.ref(`users/${userId}`).get(user);

      res.status(200).json({
        code: 10201,
        message: "Successfully",
        result: {
          name: result?.name,
          role: result?.role,
          email: result?.email,
          gender: result?.gender,
          address: result?.address,
          hospital: result?.hospital,
          department: result?.department,
          phonenumber: result?.phonenumber,
          mabhyt: result?.mabhyt,
          idcardno: result?.idcardno,
          birthday: result?.birthday,
          hometown: result?.hometown,
          nation: result?.nation,
        },
      });
    } catch (error) {
      res.status(500).json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }))

    }
  }

  static async getUserByEmail(req, res) {
    try {
      const { email } = req.body;

      await database.ref(`users/${userId}`).get(user);

      res.status(200).json({
        code: 10201,
        message: "Successfully",
        result: {
          name: result?.name,
          role: result?.role,
          email: result?.email,
          gender: result?.gender,
          address: result?.address,
          hospital: result?.hospital,
          department: result?.department,
          phonenumber: result?.phonenumber,
          mabhyt: result?.mabhyt,
          idcardno: result?.idcardno,
          birthday: result?.birthday,
          hometown: result?.hometown,
          nation: result?.nation,
        },
      });
    } catch (error) {
      res.status(500).json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }))

    }
  }

  static async search(req, res) {
    try {
      const model = new UserModel();
      const { mabhyt } = req.query;

      const users = await model.findUsers(mabhyt);

      res.status(200).json(new Response(102, "error", { isSuccessfull: true, users }));
    } catch (error) {
      res.status(500).json(new Response(102, error?.message || "Internal server !", { isSuccessfull: false }))
    }
  }

  static async enrollAdmin(user, organization) {
    // add database

    // enroll to Fabric
    await fabricAdmin.enrollAdmin(organization, "admin")
  }
}