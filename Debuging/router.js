const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url, method = req.method;
    //check the request method and url
    if (url === '/') {
        //if pruquest is get then it'll print the message from message.txt
        fs.readFile('message.txt', { encoding: 'utf8' }, (err, data) => {
            //if there is some error print the error
            if (err) { console.log(err); }
            //Writing the HTML response
            res.write('<html>');
            res.write('<head><title>Enter Message</title><head>');
            res.write(`<body><h2> User Data! </h2>${data}</body>`)
            //Writing the form respons
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        });
    }

    if (url === '/message' && method === 'POST') {
        const body = []; //to store the data 
        req.on('data', (chunk) => {
            console.log(chunk); //to view the chunk data
            body.push(chunk);
        });
        return req.on('end', () => {
            const postdata = Buffer.concat(body).toString(); //convert to string 
            console.log(postdata); //to view the postdata
            const message = postdata.split('=')[0]; //to split the data
            fs.writeFile('message.txt', message, (err) => {
                //Writing status code and location
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
}
module.exports = requestHandler;