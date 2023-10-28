import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import jwt from "jsonwebtoken";
import { pool } from "../db/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getInterface = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  } catch (error) {
    res.send(error);
  }
};

export const create_token = async (req, res) => {
  const data = req.body;

  const [rows] = await pool.query(
    "SELECT * FROM user_data WHERE username = ?",
    [data.user]
  );

  if (typeof rows[0].username === "undefined") {
    res.status(401).send("User not found");
  } else if ((await getpass(data.user)) !== data.password) {
    res.status(401).send("User not found");
  } else {
    // Cifrado
    jwt.sign(
      {rows},
      "secretkey",
      { expiresIn: "1h" },
      (error, token) => {
        if (error) {
          res.status(500).send("Can't create token");
        } else {
          res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
          res.redirect("/i/users");
        }
      }
    );
  }
};

const getpass = async (user) => {
  const [rows] = await pool.query(
    "SELECT password from user_data WHERE username = ?",
    [user]
  );
  return rows[0].password;
};
