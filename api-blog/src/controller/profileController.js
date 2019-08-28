/**
 * @file profileController.js
 * @class profileController
 * @description Class to define endpoints for profile api
 */

const logger = require('../common/log');
const profile = require('../businessLogic/profile');


module.exports = (router) => {

    /**
     * @function create
     * @method POST
     * @description Creates new profile
     * @param {req} router 
     * @returns 
     */
    router.post('/profile/create', async (req, res, next) => {
        let response = await profile.create(req.body);
        res.json(response);
    })

    /**
     * @function validate
     * @method POST
     * @description Validate username and password as part of login
     * @param {req} router 
     * @returns 
     */
    router.post('/user/validate', async (req, res) => {
        let response;
        response = await profile.validate(req.body);
        res.json(response);
    })


    return router;
}