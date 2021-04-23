const fs = require('fs');

//Write to a file
// fs.writeFile('file.json', JSON.stringify(['I am the content']), (err) => {
//     if (err) throw err;
//     console.log('File was created');
// });

//Read from a file
// fs.readFile('file.json', 'utf8', (err, content) => {
//     if (err) throw err;
//     console.log(content);
// });

//Append to an existing file
fs.readFile('file.json', 'utf8', (err, content) => {
    if (err) throw err;

    let data = JSON.parse(content);

    data.push('I am the second content');

    fs.writeFile('file.json', JSON.stringify(data), (err) => {
        if (err) throw err;
    });
});