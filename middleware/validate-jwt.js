const jwt = require ('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require ('../models/users')


const validateJWT = async (req, res, next)=>{
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg:'Miss token'          
          })
    }
   
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPTIVATEKEY);
        const userAuth = await User.findById(uid);

        if(!userAuth) {            
            return res.status(401).json({
                msg:'Invalid token'          
            });            
        }

        //Verify user status

        if(!userAuth.status) {            
            return res.status(401).json({
                msg:'Invalid tokem, status=false'          
            });            
        }


        req.userAuth = userAuth;
       
        next();

    }catch(error) {
        console.log(error);

        return res.status(401).json({
            msg:'Invalid Token'          
        })
    }
}

module.exports ={
    validateJWT
}