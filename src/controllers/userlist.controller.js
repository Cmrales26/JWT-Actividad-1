import jwt from "jsonwebtoken";
import { pool } from "../db/db.js";

let user = [];

export const getusersfromdatabase = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM user_data");

    const modifiedRows = rows.map((row) => {
      const { password, ...rest } = row;
      return rest;
    });

    user = modifiedRows;
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getInformation = (req, res) => {
  jwt.verify(req.token, "secretkey", (error, authUser) => {
    if (error) {
      res.clearCookie("token");
      return res.redirect("/");
    } else {
      console.log(user);
      res.json(user);
    }
  });
};

export const verifytoken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.token = token;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};

// export const verifytoken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization']
//     if (typeof bearerHeader !== 'undefined') {
//         const bearerToken = bearerHeader.split(' ')[1]
//         req.token = bearerToken
//         next();
//     } else {
//         res.sendStatus(403)
//     }
// }

getusersfromdatabase()