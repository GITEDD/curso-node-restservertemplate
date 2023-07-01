const { response } = require("express");

const isAdminRole = (req, res =response, next) => {

    if(!req.userAuth) {
        return res.status(500).json({
            msg: "Need to check token first"
        })

    }    

    const {role, name} = req.userAuth;    

    if(role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            msg: `Permission not vaLid for the ${name}`
        })

    }

    next();

}

const hasRole =  (...roles ) => {

    return (req, res =response, next) => {
        if(!req.userAuth) {
            return res.status(500).json({
                msg: "Need to check token first"
            })
    
        }    
    
        const {role, name} = req.userAuth;    
    
        if(!roles.includes(role)) {
            return res.status(403).json({
                msg: `Permission not vaLid for the ${name}`
            })
    
        }
    
        next();

    }



}

module.exports= {
    isAdminRole,
    hasRole 
}