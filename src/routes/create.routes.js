import { Router } from "express";
import { adduser, getinterfacecreate } from "../controllers/create.controller.js";

const router = Router();

router
    .route('/create')
    .get(getinterfacecreate) 
    .post(adduser)
export default router