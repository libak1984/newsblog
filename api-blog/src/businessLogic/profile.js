/**
 * @class profile
 * @description This class contains the business logic of profile api
 */
const profileSchema = require('../model/profile');
const logger = require('../common/log');
const response = require('../common/response');
const jwt = require('../common/jwt');


const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    /**
     * @function create
     * @description Creates new profile
     * @param {body} params 
     * @returns 
     */
    create: async (params) => {
        try {

            const profileData = new profileSchema(params);
            await profileData.save();

            return response.success('success', 200, 'CREATE_PROFILE', 'Created successfully');

        } catch (e) {
            logger.error(`Error occured while creating new profile - ${e}`);

            if (e.toString().indexOf('dup key') > 0) {
                return response.failure('failure', 500, 'ERR_DUP_USR', 'Already this username is exist');
            } else {
                return response.failure('failure', 500, 'ERR_USR_CREATION', 'Internal Error');
            }

        }
    },
    /**
     * @function validate
     * @description Validate emailaddress and password
     * @param {body} params 
     * @returns 
     */
    validate: async (params) => {

        try {

            let user;
            console.log(params);
            user = await profileSchema.find({ emailaddress: params.emailaddress, password: params.password });

            if (user && user.length > 0) {

                let token;
                token = await jwt.createToken(JSON.stringify(user[0]), JWT_SECRET);
                let payload;

                payload = {
                    token: token,
                    firstname: user[0].firstname
                }

                return response.success('success', 200, 'USR_VALIDATION', 'OK', payload);
            } else {
                return response.failure('failure', 401, 'ERR_USR_INVALID', 'Invalid username and password');
            }
        } catch (e) {
            logger.error(`Error occured while validating user - ${e}`);
            return response.failure('failure', 500, 'ERR_USR_INVALID', 'Internal Error');
        }

    }
}
