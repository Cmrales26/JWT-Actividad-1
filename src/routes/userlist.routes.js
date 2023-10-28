import { Router } from "express";
import { getInformation, verifytoken } from "../controllers/userlist.controller.js";

const router = Router();

router
    .route('/users')
    .get(verifytoken, getInformation)

export default router   