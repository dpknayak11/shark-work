const http = require('http');
const router = require('./router');

const server = http.createServer(router);

//listen to the port
server.listen(3000);