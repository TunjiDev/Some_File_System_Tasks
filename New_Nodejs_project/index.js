'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const port = 8080;

const getContentType = (filePath) => {
    let extname = path.extname(filePath);
    if (extname === '.js') {
        return 'text/javascript';
    }
    if (extname === '.css') {
        return 'text/css';
    }
}

const server = http.createServer((request, response) => {
    let filePath = path.join(__dirname, 'public', (request.url === '/') ? 'index.html' : request.url);
    let contentType = getContentType(filePath) || 'text/html';
    let errorPath = path.join(__dirname, 'public', '404.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(errorPath, 'utf8', (err, content) => {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.write(content);
                    response.end();
                });
            } else {
                    response.writeHead(500);
                    response.write('A server error has occured');
                    response.end();
                }
            } else {
            response.writeHead(200, {'Content-Type': contentType});
            response.write(content);
            response.end();
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
















// const server = http.createServer((request, response) => {
//     if (request.url === '/') {
//         let filePath = path.join(__dirname, 'public', 'index.html');
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 response.writeHead(404, {'Content-Type': 'text/html'});
//                 response.write('404 File Not Found!');
//                 response.end();
//             }
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(data);
//             response.end();
//         });
//     }
//     if (request.url === '/index2.html') {
//         let filePath = path.join(__dirname, 'public', 'index2.html');
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 response.writeHead(404, {'Content-Type': 'text/html'});
//                 response.write('404 File Not Found!');
//                 response.end();
//             }
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(data);
//             response.end();
//         });
//     }
// });
// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });