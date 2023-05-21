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
 */