import  jwt from "jsonwebtoken";


const users = [
    { user: 'Nelson', email: 'nelson@gmail.com', cellphone: '300000000' },
    { user: 'andrea', email: 'andrea@gmail.com', cellphone: '700000000' }
]

export const getInformation = (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authUser)=>{
        if(error){
            res.clearCookie("token")
            return res.redirect('/')
        }  else{
            res.json(users)
        }
      })
}

export const verifytoken = (req, res, next) => {
    const token = req.cookies.token;
    try {
        req.token = token;
        next();
    } catch (error) {
        res.clearCookie("token")
        return res.redirect('/')
    }
}

// export const verifytoken = (req, res, next) => {
//     const bearerHeader = req.headers['authorization']
//     if (typeof bearerHeader !== 'undefined') {
//         const bearerToken = bearerHeader.split(' ')[1]
//         req.token = bearerToken
//         next();
//     } else {
//         res.sendStatus(403)
//     }
// }