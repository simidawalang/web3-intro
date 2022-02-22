const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
// utf8 is the encoding used for the file

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            
        }
    }
}
module.exports = solc.compile(source, 1).contracts[':Inbox'];
// second parameter in the compile function is used to 
// specify the number of different contracts we're attempting to compile