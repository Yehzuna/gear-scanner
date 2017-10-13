const http = require('http');
const mysql = require('mysql');
const crypto = require('crypto');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const hash = crypto.createHmac('md5', 'test');
    console.log(hash.digest('hex'));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');

    //mysql.createConnection();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
