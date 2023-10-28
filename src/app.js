import express  from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import index from "./routes/index.routes.js";
import create from "./routes/create.routes.js";
import userlist from "./routes/userlist.routes.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(index);
app.use('/i', create);
app.use('/i', userlist)

//Validación 404

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './public/errors/404.html'));
});

export default app;