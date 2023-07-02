const { response } = require("express");
const bcryptjs = require('bcryptjs');
const  User =  require('../models/users')
const { generateJWT } = require('../helpers/generate-jwt');
const { googleverify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const {email, password} = req.body;
    //check email
    const user = await User.findOne({email})

    if(!user) {
        return res.status(400).json({
            msg:'Usuario with the email does not exist'
        })
    }

    //check if the user active
    if(!user.status) {
        return res.status(400).json({
            msg:'Usuario with the email does not exist- status:false'
        })

    }  

    try{     
        //check password
        const validPassword = bcryptjs.compareSync(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                msg:'Credential not valid'
            })
        }

        //generate JWT
        const  token = await generateJWT(user.id);

        res.json(
            {
                msg: 'Login OK',
                user,
                token
            }
        )

    }catch(error){
        console.log(error);

        res.status(500).json({
            msg:'Check with the admin'
        })
    } 
}

const googleSingIn = async(req, res = response) => {

    const {id_token} = req.body

    try {

        const {email, name, picture} = await googleverify(id_token);

        let user = await User.findOne({email});

        if(!user) {
           const data = {
              name,
              email,
              picture,
              google: true,
              password: "eee",
              picture
           }
           
           user = new User(data);
           await user.save();
        }

        if(!user.status) {
            res.status(401).json({
                msg:'User Unauthorized, call with the admin',
                googleUser
    
            })
        }

        const token  = await generateJWT(user.id);


        res.status(200).json({
            msg:'Everithin is Ok, google sing-in',
            user,
            token            

        })
    } catch(error){

        console.log(error);

        res.status(400).json({
            msg:'el token no se pudo verificar'
        })
    }

}




module.exports = {
    login,
    googleSingIn
}