/**
 * @file elastic
 * @class elastic
 * @description Define the business logic of elastic operation
 */
const logger = require('../common/log');
const response = require('../common/response');
const elasticsearch = require('elasticsearch');

const host = process.env.ELASTIC_HOST || '6fe9844970424bf4b956708763171ef5.us-east-1.aws.found.io';
const port = process.env.ELASTIC_PORT || 9243;
const username = process.env.ELASTIC_USER || 'elastic';
const password = process.env.ELASTIC_PASSWORD || 'rcuKCjRHpKZHERJcsq0cgd0W';

var client = new elasticsearch.Client({
    hosts: [`https://${username}:${password}@${host}:${port}`]
});

module.exports = {
    /**
     * @function create
     * @description Creates new blog
     * @param {body} params 
     * @returns 
     */
    createIndex: (params) => {
        try {

            client.index({
                index: 'blog',
                id: `${params._id}`,
                type: 'posts',
                body: {
                    "title": params.title,
                    "category": params.category,
                    "content": params.content,
                    'status': params.status,
                    'posted_at': params.posted_at,
                    'posted_by': params.posted_by

                }
            });

        } catch (e) {
            logger.error(`Error occured while creating new blog - ${e}`);
        }
    },
    /**
     * @function searchBlog
     * @description Search blogs from elastic
     * @param {body} params 
     * @returns 
     */
    searchBlog: async (params) => {
        try {

            let blogs;

            blogs = await client.search({
                index: 'blog',
                type: 'posts',
                q: `content:${params.searchTerm}`
            })

            if (blogs) {
                return response.success('success', 200, 'SEARCH_BLOGS', 'OK', blogs.hits.hits);
            } else {
                return response.failure('failure', 204, 'BLOG_NOTFOUND', 'No data available');
            }
        } catch (e) {
            logger.error(`Error occured while searching blogs - ${e}`);
            return response.failure('failure', 500, 'ERR_SEARCH_BLOGS', 'Internal Error');
        }
    }
}