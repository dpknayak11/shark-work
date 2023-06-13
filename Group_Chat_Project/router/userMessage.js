// importing necessary modules to create the rout and perform related operations
const express = require('express');
const fs = require('fs');
const router = express.Router();

// a get request route to '/messages' to read user chat from file, if not present shows message
router.get('/messages', (req, res, next) => {
    fs.readFile('userchat.txt', (err, data) => { // reading data from userchat.txt
        if (err) { data = "No data exists"; } // if no data present, show "No data exists"
        // sending response with pre-formated user chat
        // form to send message with hidden username
        res.send(`<h4> User Chat: </h4> <pre> ${data}</pre>
        <form action="/messages"  onsubmit="document.getElementById('username').value=localStorage.getItem('username' )" method="POST" > 
            <input type="text" id="message" name="message" placeholder="msg...">
            <input type="hidden" name="username" id="username">
            <button type="submit">MsgSend:</button>
            </form>`
        );
    });
})

// post request route to appends new message to userchat.txt
router.post('/messages', (req, res, next) => {
    console.log(`${req.body.username}: ${req.body.message}`) // logging username and message
    fs.appendFileSync('userchat.txt', `${req.body.username}: ${req.body.message}\n `); // appending data to userchat.txt
    res.redirect('/messages'); // redirecting response to get '/messages' request
});

// exporting router as module
module.exports = router;