
// require packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// initialize express
const app = express();

// require routes (e.g. login)
const userLogin = require('./routes/login');

// parse url-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// use login route
app.use(userLogin);

// GET messages route
app.get('/messages', (req, res, next) => {
    fs.readFile('usernames.txt', (err, data) => {
        if (err) { data = "No data exists"; }
        res.send(`<pre> ${data}</pre>
   <form action="/messages"  onsubmit="document.getElementById('username').value=localStorage.getItem('username' )" method="POST" >
    <input type="text" id="message" name="message" placeholder="msg...">
    <input type="hidden" name="username" id="username">
    <button type="submit">send</button>
    </form>`);
    });
})

// POST messages route
app.post('/messages', (req, res, next) => {
    console.log(`${req.body.username}: ${req.body.message}`)
    fs.appendFileSync('usernames.txt', `${req.body.username}: ${req.body.message}\n `);
    res.redirect('/messages');
})

// 404 not found route
app.use((req, res, next) =>{
    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));
});

// listen for incoming requests
app.listen(3000);