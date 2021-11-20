const fs = require('fs');
const entriesData = require('../data/entries');

/**
 * Reads from the entries.json file and converts data into 
 * JS objects to be stored in entries.js.
 */
function readFromFile() {
    try {
        const jsonString = fs.readFileSync('./data/entries.json', 'utf-8');
        const parsedData = JSON.parse(jsonString);
        // iterate through parsed json array and push 
        // each entry onto the entriesData array
        parsedData.forEach(parsedDataObject => {
            entriesData.push(parsedDataObject);
        })
    } catch (err) {
        console.log(err);
    }
}

// TODO
// functionWriteToFile() {

// }

module.exports = {
    readFromFile
}