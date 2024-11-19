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
        makeMMText(data);
    })
}

function makeTextFromUrl(url) {
    axios.get(`${url}`)
        .then(resp => makeMMText(resp.data))
        .catch(err =>{
            console.log(`Error fetching ${url}:\n Error: ${err.message}`);
            process.kill(1);
        });
}

function makeMMText(str) {
    let mm = new MarkovMachine(str);
    console.log(mm.makeText());
}

if (process.argv[2] === 'file') {
    console.log(`... generated text from ${process.argv[2]} '${process.argv[3]}' ...`);
    makeTextFromFile(process.argv[3]);
};
if (process.argv[2] === 'url') {
    console.log('... generated text from that URL ...')
    makeTextFromUrl(process.argv[3]);
};
