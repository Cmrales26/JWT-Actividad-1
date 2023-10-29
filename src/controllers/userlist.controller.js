import jwt from "jsonwebtoken";
import { pool } from "../db/db.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const getusersfromdatabase = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM user_data");

    const modifiedRows = rows.map((row) => {
      const { password, ...rest } = row;
      return rest;
    });

    return modifiedRows;
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const getInformation = async (req, res) => {
  try {
    let users = await getusersfromdatabase();

    jwt.verify(req.token, "secretkey", (error, authUser) => {
      if (error) {
        res.clearCookie("token");
        return res.redirect("/");

      } else {

        fs.readFile(path.join(__dirname, '../public/table.html'), 'utf8', function (err, data) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (users.length > 0) {
            let headers = Object.keys(users[0]).map(key => `<th>${key}</th>`).join('');
            let userRows = users.map(user => {
              let userCells = Object.values(user).map(value => `<td>${value}</td>`).join('');
              return `<tr>${userCells}</tr>`;
            }).join('');

            let output = data.replace('<!--userData-->', `${headers} ${userRows}`);

            res.send(output);

          } else {
            res.send(data);
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
