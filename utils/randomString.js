var crypto = require('crypto');

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toLowerCase();   // return required number of characters
}

module.exports = {
    randomValueHex
}