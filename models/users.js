const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name:{
        type:String,
        require:[true,'The name is required']
    },
    email:{
        type:String,
        require:[true,'The email is required'],
        unique:true

    },
    password:{
        type:String,
        require:[true,'The password is required']
        
    },
    img:{
        type:String,
        
    },
    role:{
        type:String,
        require:[true,'The role is required'],
        enum:['ADMIN_ROLE', 'USER_ROLE']
        
    },
    status:{
        type:Boolean,
        default:true,
        
    },
    google:{
        type:Boolean,
        default:false,
        
    },
})


userSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    
    return user;

}
module.exports = model('User', userSchema);