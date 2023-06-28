const {response, request} = require('express');


const usersGet = (req, res = response) => {
    const query_params = req.query;
    res.json({
        ok: true,
        msg:'get users api - controller',
        query_params
   })
}

const usersPost = (req , res = response) => {
    const {name, age} = req.body;
    res.json({
        ok: true,
        msg:'post users api - controller',
        name,
        age
   })
}

const usersPut = (req, res = response) => {

    const user_id = req.params.userID;
    res.json({
        ok: true,
        msg:'put users api - controller',
        user_id
   })
}

const usersDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg:'put users api - controller'
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