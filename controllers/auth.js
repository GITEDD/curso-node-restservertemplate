const { response } = require("express");
const bcryptjs = require('bcryptjs');
const  User =  require('../models/users')
const { generateJWT } = require('../helpers/generate-jwt')

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

module.exports = {
    login
}