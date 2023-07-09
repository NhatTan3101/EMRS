"use strict";

import jwt from "jsonwebtoken";
import handleError from "./error.middlewares.js";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 *
 * @param {*} user
 * @returns
 */
const generateLoginResponse = (user) => {
  const role = user.result.is_admin ? "admin" : "user";
  const token = jwt.sign(
    { uid: user.result.uid, username: user.result.username, role: role },
    JWT_SECRET
  );
  const rs = {
    userInfo: {
      display_name: user.result.partner_display_name,
      name: user.result.name,
      id: user.result.uid,
    },
    role: role,
    token: token,
  };
  return rs;
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAuth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token) {
      if (!token.includes("Bearer")) {
        throw new Error();
      }
      token = token.replace("Bearer ", "");
      const user = jwt.verify(token, JWT_SECRET);
      if (req.session.uid == user.uid) {
        req.user = user;
        next();
      } else throw new Error();
    } else {
      handleError(401, "Unauthorize", res);
    }
  } catch (e) {
    handleError(401, "Invalid token", res);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAdmin = (req, res, next) => {
  let user = req.user;
  if (user.role == "admin") {
    next();
  } else {
    handleError(403, "Access denied", res);
  }
};

export default {
  generateLoginResponse,
  isAdmin,
  isAuth,
};
