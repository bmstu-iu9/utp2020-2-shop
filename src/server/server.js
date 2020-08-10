const http = require('http');
const fs = require('fs');

const html = fs.readFileSync("../client/index.html");
const css = fs.readFileSync('../client/style.css');
const js = fs.readFileSync('../client/main.js');
const db = fs.readFileSync('../../res/db.json');
const img1 = fs.readFileSync('../../img/icons/confirmation-icon.png');
const img2 = fs.readFileSync('../../img/icons/exclamation-icon.png');
const img3 = fs.readFileSync('../../img/photo-products/Playstation/Console/ps4.jpg');
const img4 = fs.readFileSync('../../img/photo-products/Playstation/Console/ps4_slim.jpg');
const img5 = fs.readFileSync('../../img/photo-products/Playstation/Console/ps4_pro.jpg');
const img6 = fs.readFileSync('../../img/photo-products/Playstation/Console/ps_vita.jpg');
const img7 = fs.readFileSync('../../img/photo-products/Playstation/Console/ps5.jpg');
const img8 = fs.readFileSync('../../img/photo-products/Playstation/Game/cars3.jpg');
const img9 = fs.readFileSync('../../img/photo-products/Playstation/Game/Horizon_Zero_Dawn.jpg');
const img10 = fs.readFileSync('../../img/photo-products/Playstation/Game/The_Last_of_Us.jpg');
const img11 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Console/img11.jpg');
const img12 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Console/img12.png');
const img13 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Console/img13.png');
const img14 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Console/img14.png');
const img15 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/StreetFighter.png');
const img16 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/Rime.png');
const img17 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/ChildofLightValiantHearts.png');
const img18 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/Bayonetta2.png');
const img19 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/Wolfenstein2.png');
const img20 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/AssassinsCreed3.png');
const img21 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/RaymanLegends.png');
const img22 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/Skyrim.png');
const img23 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/SuperSmashBros.png');
const img24 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/MonsterHunter.png');
const img25 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/Payday2.png');
const img26 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/FarmingSimulator.png');
const img27 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/RedFaction.png');
const img28 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/Darksiders.jpg');
const img29 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/SuperMarioOdyssey.png');
const img30 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Game/SidMeiersCivilizationVI.png');
const img31 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Accessory/ProControllerOriginal.png');
const img32 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Accessory/ProControllerSplatoonVersion.png');
const img33 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Accessory/CaseOriginal.png');
const img34 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Accessory/PortableDock-chargerOriginal.png');
const img35 = fs.readFileSync('../../img/photo-products/Nintendo-Switch/Accessory/Joy-ConOriginal.png');
const img36 = fs.readFileSync('../../img/photo-products/Xbox/Console/XboxOneS.png');

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

        case '/img/icons/confirmation-icon.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img1);
            break;

        case '/img/icons/exclamation-icon.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img2);
            break;

        case '/img/photo-products/Playstation/Console/ps4.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img3);
            break;

        case '/img/photo-products/Playstation/Console/ps4_slim.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img4);
            break;

        case '/img/photo-products/Playstation/Console/ps4_pro.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img5);
            break;

        case '/img/photo-products/Playstation/Console/ps_vita.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img6);
            break;

        case '/img/photo-products/Playstation/Console/ps5.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img7);
            break;

        case '/img/photo-products/Playstation/Game/cars3.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img8);
            break;

        case '/img/photo-products/Playstation/Game/Horizon_Zero_Dawn.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img9);
            break;

        case '/img/photo-products/Playstation/Game/The_Last_of_Us.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img10);
            break;

        case '/img/photo-products/Nintendo-Switch/Console/img11.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img11);
            break;

        case '/img/photo-products/Nintendo-Switch/Console/img12.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img12);
            break;

        case '/img/photo-products/Nintendo-Switch/Console/img13.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img13);
            break;

        case '/img/photo-products/Nintendo-Switch/Console/img14.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img14);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/StreetFighter.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img15);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/Rime.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img16);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/ChildofLightValiantHearts.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img17);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/Bayonetta2.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img18);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/Wolfenstein2.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img19);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/AssassinsCreed3.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img20);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/RaymanLegends.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img21);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/Skyrim.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img22);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/SuperSmashBros.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img23);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/MonsterHunter.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img24);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/Payday2.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img25);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/FarmingSimulator.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img26);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/RedFaction.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img27);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/Darksiders.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.end(img28);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/SuperMarioOdyssey.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img29);
            break;

        case '/img/photo-products/Nintendo-Switch/Game/SidMeiersCivilizationVI.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img30);
            break;

        case '/img/photo-products/Nintendo-Switch/Accessory/ProControllerOriginal.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img31);
            break;

        case '/img/photo-products/Nintendo-Switch/Accessory/ProControllerSplatoonVersion.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img32);
            break;

        case '/img/photo-products/Nintendo-Switch/Accessory/CaseOriginal.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img33);
            break;

        case '/img/photo-products/Nintendo-Switch/Accessory/PortableDock-chargerOriginal.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img34);
            break;

        case '/img/photo-products/Nintendo-Switch/Accessory/Joy-ConOriginal.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img35);
            break;

        case '/img/photo-products/Xbox/Console/XboxOneS.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(img36);
            break;

        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("404 Not Found");
            break;
    }
}).listen(3000, () => console.log('Сервер работает'));
