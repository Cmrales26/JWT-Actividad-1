import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();


router.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/create.html'))
});


export default router