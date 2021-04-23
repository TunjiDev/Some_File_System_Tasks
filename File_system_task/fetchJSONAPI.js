'use strict';

const fs = require('fs');
const fetch = require('node-fetch');

//Fetching the data from the url
fetch('http://jsonplaceholder.typicode.com/posts/')

    //converting to a json file
    .then(response => response.json())

    //handling the converted json data
    .then(json => {

        //We need to "stringify" the data before we can store it in a string form in the file.
        fs.writeFile('./result/posts.json', JSON.stringify(json, null, 2), err => {
            if (err) throw err;
            console.log('File has been created');
        }); 
    });

    //some other stuff and stuff