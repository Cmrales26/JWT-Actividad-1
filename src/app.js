import express  from "express";
import index from "./routes/index.routes.js";
// import login from "./routes/login.routes.js";
import create from "./routes/create.routes.js";
import userlist from "./routes/userlist.routes.js";
import cookieParser from "cookie-parser";

const app = express();



app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(index);
// app.use('/i', login);
app.use('/i', create);
app.use('/i', userlist)
export default app;