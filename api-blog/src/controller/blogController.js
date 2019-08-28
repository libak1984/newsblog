/**
 * @file blogController.js
 * @class blogController
 * @description Class to define endpoints for blogs api
 */

const blog = require('../businessLogic/blog');


module.exports = (router) => {

    /**
     * @function create
     * @method POST
     * @description Creates new blog
     * @param {req} router 
     * @returns 
     */
    router.post('/blog/create', async (req, res, next) => {
        let response = await blog.create(req.body);
        res.json(response);
    })

    /**
     * @function publish
     * @method POST
     * @description Pulbish created blog     
     * @param {req} router 
     * @returns 
     */
    router.post('/blog/publish', async (req, res, next) => {
        let response = await blog.publish(req.body);
        res.json(response);
    })

    /**
     * @function delete
     * @method POST
     * @description Delete a blog     
     * @param {req} router 
     * @returns 
     */
    router.post('/blog/delete', async (req, res, next) => {
        let response = await blog.delete(req.body);
        res.json(response);
    })

    /**
     * @function delete
     * @method POST
     * @description List all blog     
     * @param {req} router 
     * @returns 
     */
    router.post('/blog/list', async (req, res, next) => {
        let response = await blog.list(req.body);
        res.json(response);
    })

    return router;
}