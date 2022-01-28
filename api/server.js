// =============================================================================================
const md5 = require('md5');
const fs = require('fs');
const cors = require('cors');
const port = 4001;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// =============================================================================================


// =============================================================================================

const Discord = require('discord.js')
let serv = new Discord.MessageEmbed();

// =============================================================================================


// =============================================================================================
const redis = require('redis')
const {data} = require("express-session");
const {createClient} = require("redis");
const session = require("express-session");
let redisStore = require('connect-redis')(session)
const redisClient = redis.createClient({
    host: 'dono-01.danbot.host',
    port: 1276
})
// =============================================================================================


// =============================================================================================

const sessionStore = new redisStore({client: redisClient});

app.use(session({
    name: 'FileSession1',
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    secret: '42394382902390420423',
    cookie: {
        maxAge: 100000,
        sameSite: true
    }
}))

// =============================================================================================


// =============================================================================================

createClient({
    url: 'redis://dono-01.danbot.host:1276?db=Astrofile password=P@55w0rd'
});

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

// =============================================================================================


// =============================================================================================

app.use(bodyParser.raw({type: 'application/octet-stream', limit: '10000mb'}));
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use('/uploads', express.static('uploads'));

// =============================================================================================

app.post('/uploads', (req, res) => {
    const {name, currentChunkIndex, totalChunks} = req.query;
    const firstChunk = parseInt(currentChunkIndex) === 0;
    const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;
    const ext = name.split('.').pop();
    const data = req.body.toString().split(',')[1];
    const buffer = new Buffer(data, 'base64');
    const tmpFilename = 'tmp_' + md5(name + req.ip) + '.' + ext;
    if (firstChunk && fs.existsSync('./uploads/' + tmpFilename)) {
        fs.unlinkSync('./uploads/' + tmpFilename);
    }
    fs.appendFileSync('./uploads/' + tmpFilename, buffer);
    if (lastChunk) {
        const finalFilename = md5(Date.now()).substr(0, 6) + '.' + ext;
        fs.renameSync('./uploads/' + tmpFilename, './uploads/' + finalFilename);
        res.json({finalFilename});
    } else {
        res.json('ok');
    }
});

// =============================================================================================

app.listen(port, () => console.log(`Backend listening on port ${port}!`))
console.log('backend Connected!');

// =============================================================================================