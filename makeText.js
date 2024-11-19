/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');


function makeTextFromFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${filePath}\n Error: ${err.message}`);
            process.kill(1);
        }
        console.log(makeMMText(data));
    })
}

function makeTextFromUrl(url) {
    axios.get(`${url}`)
        .then(resp => console.log(makeMMText(resp.data)))
        .catch(err => console.log(`Error fetching ${url}:\n Error: ${err.message}`));
}

function makeMMText(str) {
    let mm = new MarkovMachine(str);
    return mm.makeText();
}

if (process.argv[2] === 'file') makeTextFromFile(process.argv[3]);
if (process.argv[2] === 'url') makeTextFromUrl(process.argv[3]);
