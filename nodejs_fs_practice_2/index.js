'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const port = 8080;

//Checking if the folder exists and creating it if it doesn't
const resultFolder = 'result';
if (!fs.existsSync(resultFolder)) {
    fs.mkdirSync(resultFolder);
}

// Fetching the data from the json placeholder
fetch('http://jsonplaceholder.typicode.com/posts/')

//converting to a json file
.then(response => response.json())

//handling the converted json data
.then(json => {

    //We need to "stringify" the data before we can store it in a string form in the file.
    stringedData = JSON.stringify(json, null, 2);
    fs.writeFile('./result/posts.json', stringedData, (err) => {
        if (err) throw err;
        console.log('File was created successfully!');
    });
});

//Creating a server and reading the file on the server
const server = http.createServer(function(request, response) {
    let filePath = path.join(__dirname, 'result', 'posts.json');

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) throw err;

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(content);
        response.end();
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Some comments