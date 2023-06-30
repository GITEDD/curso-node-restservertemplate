const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/users');


const usersGet = async (req, res = response) => {
    //Get query params
    const {limit = 5, since =0} = req.query;
    const query = {status:true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(since).limit(limit),
    ])
        
    res.json({
        ok: true,
        msg:'get users api - controller',
        total,
        users
   })
}

const usersPost = async (req , res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});   
    console.log('post')    

    //Make hashing of  password
    const salt = bcryptjs.genSaltSync(10);//10 default value
    user.password = bcryptjs.hashSync(user.password, salt);

    // Save
    await user.save(); 

    res.status(201).json({
        ok: true,
        user
   })
}

const usersPut = async(req, res = response) => {

    const id = req.params.id;

    const {_id, password, google, email, ...userData} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(password, salt);
    }



    const userDB = await User.findByIdAndUpdate(id,userData)

    res.json({
        ok: true,
        msg:'put users api - controller',
        userDB
   })
}

const usersDelete = async(req, res = response) => {

    const id = req.params.id;
    console.log('user delete',id)
    const user = await User.findByIdAndUpdate(id,{status:false})

    res.json({
        ok: true,
        msg:'delete users api - controller',
        user
   })
}

const usersPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg:'patch users api - controller'
   })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}