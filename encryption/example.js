const bcrypt = require('bcryptjs');
const saltRounds = 10;

const plainPassword1 = 'popino';

// almacenado BBDD
const salt = bcrypt.genSaltSync(saltRounds);
const hash1 = bcrypt.hashSync(plainPassword1, salt);
console.log(`Hash 1: ${hash1}`);

// comprobación ruta
const verifyPass1 = bcrypt.compareSync('Popino', hash1);
console.log(`Is plainPassword1 corresponding to the created hash1: ${verifyPass1}`);