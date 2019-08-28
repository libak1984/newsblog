/**
 * @file profile.js
 * @class profileSchema
 * @description Define the properites of profile schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

let curDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

let profileSchema = new Schema({
    firstname: { type: String, required: true, index: true },
    lastname: { type: String, required: true, index: true },
    emailaddress: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    created_at: { type: String, default: curDateTime }
}, { collection: 'profiles' });

module.exports = mongoose.model('profiles', profileSchema);