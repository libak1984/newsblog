/**
 * @file blog
 * @class blog
 * @description Define the business logic of blogs api
 */
const blogSchema = require('../model/blog');
const logger = require('../common/log');
const response = require('../common/response');
const jwt = require('../common/jwt');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const elastic = require('./elastic');

module.exports = {
    /**
     * @function create
     * @description Creates new blog
     * @param {body} params 
     * @returns 
     */
    create: async (params) => {
        try {

            const blogData = new blogSchema(params);
            let resp = await blogData.save();
            elastic.createIndex(resp);
            return response.success('success', 200, 'CREATE_BLOG', 'Created successfully');

        } catch (e) {
            logger.error(`Error occured while creating new blog - ${e}`);
            return response.failure('failure', 500, 'ERR_BLOG_CREATION', 'Internal Error');
        }
    },

    /**
     * @function publish
     * @description Publish created blog
     * @param {body} params 
     * @returns 
     */
    publish: async (params) => {
        try {
            let query = { _id: params.id };
            let updateDate = {
                status: 'published'
            };

            let blog;
            blog = await blogSchema.findOneAndUpdate(query, updateDate);

            if (blog) {
                return response.success('success', 200, 'PUBLISH_BLOG', 'Published successfully');
            } else {
                return response.failure('failure', 500, 'ERR_BLOG_PUBLISH', 'Internal Error');
            }
        } catch (e) {
            logger.error(`Error occured while publishing blog - ${e}`);
            return response.failure('failure', 500, 'ERR_BLOG_PUBLISH', 'Internal Error');
        }
    },

    /**
     * @function delete
     * @description Delete a blog
     * @param {body} params 
     * @returns 
     */
    delete: async (params) => {
        try {

            let blog;
            blog = await blogSchema.findOneAndRemove({ _id: params.id });

            if (blog) {
                return response.success('success', 200, 'DELETE_BLOG', 'Deleted successfully');
            } else {
                return response.failure('failure', 500, 'ERR_BLOG_DELETE', 'Internal Error');
            }

        } catch (e) {
            logger.error(`Error occured while deleting blog - ${e}`);
            return response.failure('failure', 500, 'ERR_BLOG_DELETE', 'Internal Error');
        }
    },
    /**
     * @function listBlogs
     * @description List blogs
     * @param {body} params 
     * @returns 
     */
    list: async (params) => {
        try {

            let blogs;
            blogs = await blogSchema.find(params);

            if (blogs && blogs.length > 0) {
                return response.success('success', 200, 'FETCH_BLOGS', 'OK', blogs);
            } else {
                return response.failure('failure', 204, 'BLOG_NOTFOUND', 'No data available');
            }
        } catch (e) {
            logger.error(`Error occured while fetching blogs - ${e}`);
            return response.failure('failure', 500, 'ERR_FETCH_BLOGS', 'Internal Error');
        }
    }
}