/**
 * @file blog.js
 * @class blogSchema
 * @description Define the properites of profile schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let curDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

let blogSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, default: 'publish' },
    posted_by: { type: String, required: true },
    posted_at: { type: String, default: curDateTime }
}, { collection: 'blogs' });

blogSchema.index({
    title: 'text',
    category: 'text',
    content: 'text',
    posted_by: 'text'
}, {
        weights: {
            title: 2,
            category: 3,
            description: 1,
            posted_by: 4
        },
    });

module.exports = mongoose.model('blogs', blogSchema);