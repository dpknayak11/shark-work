const http = require('http');

const server = http.createServer((req, res) => {
    console.log("My Self Deepak Nayak");
    process.exit();
});
server.listen(4000);
/*

 */