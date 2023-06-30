const {Router} = require('express');
const {usersGet, usersPost, usersPut, usersDelete, usersPatch} = require('../controllers/users');
const { check } = require('express-validator');
const {validateField}= require('../middleware/validate-field');
const router = Router();
const Role = require('../models/roles')
const {isRoleValid, checkEmail, checkUserById} = require('../helpers/db-validators')

router.get('/', usersGet);

router.post('/',[
    check('name',"The name is required").not().isEmpty(),
    check('password',"The password must be 6 chars").isLength({min:6}),
    check('email',"The email is not valid").isEmail(),
   // check('role',"The role is not valid").isIn(['ADMIN_ROLE','USER_ROLE']),
   check('role').custom(isRoleValid),
   check('email').custom(checkEmail)
   ,
    validateField
],usersPost);

router.put('/:id',[
    check('id', "Id not valid").isMongoId(),
    check('password',"The password must be 6 chars").isLength({min:6}),
    check('id').custom(checkUserById),
    check('role').custom(isRoleValid),    
    validateField

] ,usersPut);

router.delete('/:id',[
    check('id', "Id not valid").isMongoId(),
    check('id').custom(checkUserById),
    validateField
],usersDelete);

router.patch('/',usersPatch);


module.exports = router;


