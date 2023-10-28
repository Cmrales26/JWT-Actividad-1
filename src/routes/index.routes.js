import { Router } from "express";
import { create_token, getInterface } from "../controllers/Singin.controller.js";

const router = Router();

router
    .route("/")
    .get(getInterface)
    .post(create_token)


export default router;