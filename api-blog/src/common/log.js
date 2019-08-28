/**
 * @file log.js
 * @class log
 * @description Class to define common log functionalities
 */

const bunyan = require('bunyan')

const logLevel = process.env.LOG_LEVEL || 'info'
const logName = process.env.LOG_NAME || 'common'
const logger = bunyan.createLogger({ name: logName, level: logLevel })

module.exports = logger