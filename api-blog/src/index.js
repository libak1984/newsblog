/**
 * @file index.js is an entry file 
 * @description This class to create web server using express
*/

const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const cors = require('cors');
const logger = require('./common/log');

const allowOrigin = process.env.ALLOW_ORIGIN;

const corsOptions = {
    origin: allowOrigin,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb', extended: true }))

require('./routes')(app, router);

PORT = process.env.PORT || 5000;

const db = require('./common/db');

app.listen(PORT, () => {

    db.connect((err) => {
        if (err) {
            logger.error('Unable to connect database');
            process.exit();
        } else {
            logger.info('Connected to database!')
            logger.info(`Listening on port ${PORT}`);
        }
    })
})