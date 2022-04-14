const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0OTkwNjk1OH0.P-P8nh73SuRfeLodNDokswgRvIT3nGLMpema8y9jTcQ';

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
