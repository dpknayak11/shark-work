const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url, method = req.method;
    const path = require('path');
    if (url === '/') {
        fs.readFile('message.txt', { encoding: 'utf8' }, (err, data) => {
            if (err) { console.log(err); }
            res.write('<html>');
            res.write('<head><title>Enter Message</title><head>');
            res.write(`<body><h2> User Data! </h2>${data}</body>`)
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        })
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const postdata = Buffer.concat(body).toString();
            console.log(postdata);
            const message = postdata.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
});
server.listen(3000);

