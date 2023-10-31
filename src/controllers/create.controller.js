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
  if (data.password.trim() !== data.validate_password.trim()) {
    res.status(401).json({ error: "Passwords are not equals" });
    return;
  }

  if ((await existuser(data.user.trim())) === true) {
    res.status(401).json({ error: "User already exists" });
    return;
  }

  let encrypted_pass = cryppass(data.password.trim());
  try {
    if (
      data.user.trim() === "" ||
      data.password.trim() === "" ||
      data.first_name.trim() === "" ||
      data.last_name.trim() === "" ||
      data.email.trim() === "" ||
      data.phone.trim() === "" ||
      data.validate_password.trim() === ""
    ) {
      return res.status(401).json({ error: "There are blank characters" });
    } else {
      const [rows] = await pool.query(
        "INSERT INTO user_data (username, password, first_name, last_name, phone, email)  VALUES (?,?,?,?,?,?)",
        [
          data.user.trim(),
          encrypted_pass,
          data.first_name.trim(),
          data.last_name.trim(),
          data.phone.trim(),
          data.email.trim(),
        ]
      );
      res.json({ redirect: "/" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
