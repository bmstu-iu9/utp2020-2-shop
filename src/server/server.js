const fs = require("fs");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/res', express.static(path.join(__dirname, '../../res')));
app.use('/img', express.static(path.join(__dirname, '../../img')));

app.post("/order-confirmed", urlencodedParser, function (request, response) {
    if(!request.body) {
        return response.sendStatus(400);
    }
    fs.renameSync('../../res/db.json', '../../res/db.json.bak');
    fs.appendFileSync('../../res/db.json', JSON.stringify(request.body, null, '\t'));
    fs.unlinkSync('../../res/db.json.bak');
});

app.listen(3000, () => { console.log('Сервер работает') });