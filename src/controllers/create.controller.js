import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { pool } from "../db/db.js";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getinterfacecreate = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/create.html"));
};

export const adduser = async (req, res) => {
  const data = req.body;

  // Validations
  if (data.password !== data.validate_password) {
    return res.json("Paswords are not the same");
  }

  if ((await existuser(data.user)) === true) {
    return res.json("The user name is already used");
  }

  let encrypted_pass = cryppass(data.password)

  try {
      const [rows] = await pool.query(
          "INSERT INTO user_data (username, password, first_name, last_name, phone, email)  VALUES (?,?,?,?,?,?)",
          [data.user, encrypted_pass, data.first_name, data.last_name, data.phone, data.email]
      );

      res.redirect('/')

  } catch (error) {
      return res.status(500).json(error);
  }
};

export const existuser = async (user) => {
  const [rows] = await pool.query(
    "SELECT username FROM user_data WHERE username = ?",
    [user]
  );

  if (typeof rows[0] === "undefined") {
    return false;
  } else {
    return true;
  }
};

const cryppass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
