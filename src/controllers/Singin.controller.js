import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import  jwt from "jsonwebtoken";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getInterface = (req,res) =>{
    try {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    } catch (error) {
        res.send(error);
    }
}


let user = {
    id: 1,
    user: 'Nelson',
    password: '123',
    mail: 'nelson@gmail.com'
}

export const create_token = (req, res) =>{
    const data = req.body
    if (data.user === user.user && data.password === user.password) { //Aqui se valida cuando este la base de datos
        const information = user
        // Cifrado
        jwt.sign({information}, 'secretkey', {expiresIn: '120s'}, (error, token)=>{
            if(error){
                res.status(500).send("Can't create token");  
            }else{
                res.cookie('token', token, { maxAge: 120000, httpOnly: true });
                res.redirect('/i/users')
            }
        })
    }else{
        res.status(401).send("User not found");
    }
}