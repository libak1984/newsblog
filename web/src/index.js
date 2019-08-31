/**
 * @file index.js is an entry file 
 * @description This class to create web server using express
*/

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

console.log(path.join(__dirname, '../assets'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));


router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.use('/', router);

let PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})