/**
 * @file jwt.js
 * @class JWT
 * @description Class to define common jwt functionalities
 */
const jwt = require('jsonwebtoken');
const logger = require('./log');

class JWT {
   /**
     * Create json web token with validity
     * @param {*} payload
     * @param {*} secret
     * @param {*} expiry
     * @returns
     * @memberof jsonwebToken
     */
    createToken(payload, secret, expiry) {
        return new Promise((resolve, reject) => {
            try {
                jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
                    if (err) {
                        logger.error(`Error on JWT creation: ${err}`);
                        reject(err);
                    }
                    resolve(token);
                })
            } catch (Ex) {
                logger.error(`Error on JWT creation: ${Ex}`);
                reject(Ex);
            }

        })

    }

    /**
     * Create json web token without validity
     * @param {*} payload
     * @param {*} secret
     * @returns
     * @memberof jsonwebToken
     */
    createToken(payload, secret) {
        return new Promise((resolve, reject) => {
            try {
                jwt.sign(payload, secret, (err, token) => {
                    if (err) {
                        logger.error(`Error on JWT creation: ${err}`);
                        reject(err);
                    }
                    resolve(token);
                })
            } catch (Ex) {
                logger.error(`Error on JWT creation: ${Ex}`);
                reject(Ex);
            }
        })
    }

    /**
     * Decode json webtoken
     * @param {*} token
     * @param {*} secret
     * @returns
     * @memberof jsonwebToken
     */
    decodeToken(token, secret) {
        return new Promise((resolve, reject) => {
            try {
                jwt.verify(token, secret, (err, decoded) => {
                    if (err) {
                        logger.error(`Error on JWT verification: ${err}`);
                        reject(err);
                    }
                    resolve(decoded);
                })

            } catch (Ex) {
                logger.error(`Error on JWT verification: ${Ex}`);
                reject(Ex);
            }
        })
    }
}

module.exports = new JWT();