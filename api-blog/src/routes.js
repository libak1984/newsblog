/**
 * @file routes.js
 * @class routes
 * @description Class to define all the routes of blog api
 */


module.exports = (app, router) => {
    /**
     * @module controller
     * @description Route definition for health check module
    */
    app.use('/api/info', require('./controller/healthCheck')(router));

    /** 
     * @module controller 
     * @description Route definition for profile module
    */
    app.use('/api', require('./controller/profileController')(router));

    /** 
     * @module controller 
     * @description Route definition for blog module
    */
    app.use('/api', require('./controller/blogController')(router));
}