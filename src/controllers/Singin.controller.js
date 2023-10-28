import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import jwt from "jsonwebtoken";
import { pool } from "../db/db.js";
import bcrypt from "bcryptjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const getInterface = (req, res) => {
  try {
    jwt.verify(req.token, "secretkey", (error, authUser) => {
      if (error) {
        res.clearCookie("token");
        res.sendFile(path.join(__dirname, "../public/login.html"));
      } else {
        res.redirect('/i/users')
      }
    });
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

  if (!rows || !rows[0] || typeof rows[0].username === "undefined") {
    res.status(403).sendFile(path.join(__dirname, '../public/errors/403.html'));
  } else {
    // obtengo la contraseña cifrada
    let hashedpass = await getpass(data.user);

    // Valido igualdad
    if (decrypt(data.password, hashedpass)) {
      // Token

      if (typeof data.staysign === 'undefined') {
        jwt.sign({ rows }, "secretkey", { expiresIn: "120s"}, (error, token) => {
          if (error) {
            res.status(500).send("Can't create token");
          } else {
            res.cookie("token", token, { maxAge: 120000, httpOnly: true });
            res.redirect("/i/users");
          }
        });
      } else {
        jwt.sign({ rows }, "secretkey", (error, token) => {
          if (error) {
            res.status(500).send("Can't create token");
          } else {
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/i/users");
          }
        });
        
      }

    } else {
      res.status(403).sendFile(path.join(__dirname, '../public/errors/403.html'));
    }
  }
};

const getpass = async (user) => {
  const [rows] = await pool.query(
    "SELECT password from user_data WHERE username = ?",
    [user]
  );
  return rows[0].password;
};

const decrypt = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect('/')
}
