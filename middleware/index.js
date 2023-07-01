const validateFields = require('../middleware/validate-field');
const validateJWTs = require('../middleware/validate-jwt');
const validateRoles = require('../middleware/validate-roles');

module.exports = {
    ...validateFields,
    ...validateJWTs,
    ...validateRoles

}