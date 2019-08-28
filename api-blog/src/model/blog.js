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
    title: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    content: { type: String, required: true },
    status: { type: String, default: 'created' },
    posted_by: { type: String, required: true, index: true },
    posted_at: { type: String, default: curDateTime }
}, { collection: 'blogs' });

module.exports = mongoose.model('blogs', blogSchema);