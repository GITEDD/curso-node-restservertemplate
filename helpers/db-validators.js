const Role = require('../models/roles');
const User = require('../models/users');


const isRoleValid= async(role='')=> {
    const existRole = await Role.findOne({role});

    if( !existRole ){
        throw new Error(`The role:${role} does not exist in the DB`);
    }
}

const checkEmail= async(email='')=> {
    const existEmail = await User.findOne({email});
    console.log

    if( existEmail ){
        throw new Error(`The email:${email} exists in the DB`);
    }
}

const checkUserById = async (userID) =>{
    const existUser = await User.findById(userID);
    console.log('user exist',existUser, userID);

    if( !existUser ){
        throw new Error(`The ID:${userID} does not exists in the DB`);
    }
}
module.exports= {
    isRoleValid,
    checkEmail,
    checkUserById
}