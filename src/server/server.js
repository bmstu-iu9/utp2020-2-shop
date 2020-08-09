const http = require('http');
const fs = require('fs');

const html = fs.readFileSync("../client/index.html");
const css = fs.readFileSync('../client/style.css');
const js = fs.readFileSync('../client/main.js');
const db = fs.readFileSync('../../res/db.json');

http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
            break;

        case '/style.css':
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(css);
            break;

        case '/main.js':
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(js);
            break;

        case '/res/db.json':
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end(db);
            break;

        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("404 Not Found");
            break;
    }
}).listen(3000, () => console.log('Сервер работает'));