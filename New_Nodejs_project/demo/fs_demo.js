const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'demo.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    // console.log(err);
    console.log(data);
});