const express = require("express");
const path = require("path");
const app = express();

app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/res', express.static(path.join(__dirname, '../../res')));
app.use('/img', express.static(path.join(__dirname, '../../img')));

app.listen(3000, () => console.log('Сервер работает'));
