// This code is setting up an Express server with a login page and a messages page along with routes for each.

// require the file system and express libraries
const fs = require('fs');
const express = require('express')

// require body parser to work with post requests
const bodyParser = require('body-parser')

// create an instance of express
const app = express();

// use body parser to get url params
app.use(bodyParser.urlencoded({ extended: false }));

// create a route for the login page
app.get('/login', (req, res, next) => {
    // send an html form to the page which will POST to the /messages route
    res.send(`<h> 1 .... </h1><form
    action="/messages" method="post"
    onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
    <h> 2 .... </h1>
    <input type="text" name="username" placeholder="enter username" id="username"/>
    <h> 3 .... </h1>
    <button type="submit">Login</button>
    <h> 4 .... </h1>
  </form>`)
});

// GET messages route
app.get('/messages', (req, res, next) => {
    // read the data.txt file
    
    fs.readFile('data.txt', (err, data) => {
        // if there is an error, set data to 'No data exists'
        if (err) { data = "No data exists"; }
        // send the file's data inside an html pre tag along with an html form to input messages
        res.send(`<pre> ${data} </pre>
        <h> 5 .... </h1>
   <form action="/messages"  onsubmit="document.getElementById('username').value=localStorage.getItem('username' )" method="POST" >
   <h> 6 .... </h1>
    <input type="text" id="message" name="message" placeholder="msg...">
    <h> 7 .... </h1>
    <input type="text" name="username" id="username">
    <h> 8 .... </h1>
    <button type="submit">send</button>
    <h> 9 .... </h1>
    </form>`);
    });
})

// POST messages route
app.post('/messages', (req, res, next) => {
    // console log the incoming message
    console.log(`${req.body.username}: ${req.body.message}`)
    // append the incoming message to data.txt 
    fs.appendFileSync('data.txt', `${req.body.username}: ${req.body.message}\n `);
    // redirect to the /messages page
    res.redirect('/messages');
})

// 404 not found route
app.use((req, res, next) => {
    // send a 404 message if page is not found
    res.status(404).send(`<h1>page note found!</h1>`)
})

// start listening to incoming requests on port 5000
app.listen(5000);