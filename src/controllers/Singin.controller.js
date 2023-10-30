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
    return res.status(500).json({error: error.message});
  }
};

export const create_token = async (req, res) => {
  const data = req.body;

  const [rows] = await pool.query(
    "SELECT id, username, first_name, last_name, phone, email FROM user_data WHERE username = ?",
    [data.user]
  ); 

  if (!rows || !rows[0] || typeof rows[0].username === "undefined") {
    res.status(403).json({error: 'Wrong credential'});
  } else {

    let hashedpass = await getpass(data.user);

    if (decrypt(data.password, hashedpass)) {
      
      if (typeof data.staysign === 'undefined') {
        jwt.sign({ rows }, "secretkey", { expiresIn: "120s"}, (error, token) => {
          if (error) {
            res.status(500).send("Can't create token");
          } else {
            res.cookie("token", token, { maxAge: 120000, httpOnly: true });
            res.cookie("username", data.user, { maxAge: 120000, httpOnly: false });
            res.json({redirect: "/i/users"});
          }
        });
      } else {
        jwt.sign({ rows }, "secretkey", (error, token) => {
          if (error) {
            res.status(500).send("Can't create token");
          } else {
            res.cookie("token", token, { httpOnly: true });
            res.cookie("username", data.user, { httpOnly: false });
            res.json({redirect: "/i/users"});
          }
        });
        
      }

    } else {
      res.status(403).json({error: 'Wrong credentials'});
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
  res.clearCookie("username"); 
  res.redirect('/')
}
