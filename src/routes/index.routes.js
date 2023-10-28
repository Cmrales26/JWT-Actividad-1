import { Router } from "express";
import { create_token, getInterface, logout } from "../controllers/Singin.controller.js";
import { verifytoken } from "../controllers/userlist.controller.js";

const router = Router();

router
    .route("/")
    .get(verifytoken,getInterface)
    .post(create_token)

router
    .route("/i/user/signup")
    .post(logout)



export default router;