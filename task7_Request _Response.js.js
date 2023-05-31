const http = require('http');
const server = http.createServer((req, res) =>{
    // console.log(req.method, req.headers, req.url);
    const url = req.url;
    if (url === '/home') {
    res.write('<html>');
    res.write('<body><h1>Welcome home!</h1></body>');
    res.write('</html>');
    return res.end();
    }
    else if(url === '/about'){
    res.write('<html>');
    res.write('<body><h1>Welcome to About Us page!</h1></body>');
    res.write('</html>');
    return res.end();
    }
    else if(url === '/contact'){
    res.write('<html>');
    res.write('<body><h1>Welcome to my Node Js project</h1></body>');
    res.write('</html>');
    return res.end();
    } 
});
server.listen(3000);

/*
1. Explain the nodejs event driven architecture.
2. How can it basically scale to handle 1000 of requests a sec. What helps node JS even though it is single threaded?
3. What does process.exit do?
4. What does req.url , req.header and req.method contain?

1. Node.js event-driven architecture is based on a non-blocking I/O model allowing it to handle multiple simultaneous client connections with high throughput and low latency.
2. Node.js uses a single thread and an asynchronous event loop that allows it to scale to thousands of requests per second. It is lightweight compared to other web frameworks, allowing it to handle more requests with the same server resources. 
3. process.exit() causes the process to exit with an exit code indicating either success or failure. 
4. req.url contains the requested URL path, req.header contains header information about the request, and req.method contains a string representing the HTTP request method (e.g. ‘GET’ or ‘POST’).
 */
