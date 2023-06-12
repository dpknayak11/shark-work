// const http = require('http');
const express = require('express');
const app = express();
 // adding middleware
app.use((req, res, next) => {
console.log('in the middleware_1');
next(); // Allows the request to continue to the next middleware in line
});
app.use((req, res, next) => {
        console.log('in the middleware_2');
        res.send("<h1>hello to node js</h1>");
        // res.send( { key1: "value" });
});
//listen to the port
app.listen(3000);
//This code creates an http server using the express module and  listens to port3000. It requires the http and express modules for achieving the goal.