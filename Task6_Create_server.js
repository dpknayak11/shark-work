const http = require('http');

const server = http.createServer((req, res) => {
    console.log("My Self Deepak Nayak");
    process.exit();
});
server.listen(4000);
/*
1. Explain how does the internet work in your own words.
2. What are the core modules of node js?
3. What are relative path and absolute path? How to define them?
4. What does createServer do?
5. What are anonymous functions?
6. What do you think server.listens exactly do?Why do we need it?

1. The internet is a worldwide network of devices connected through cables or wireless signals. It allows us to access and share information from anywhere in the world. Data is sent from one device to another through a server that stores and retrieves data, allowing for an exchange of information between two or more devices.

2. The core modules of node js are the file system, HTTP, DNS, events, streams, path, crypto, os, and url modules.

3. A relative path refers to a location relative to the current location and an absolute path refers to an exact location with a full address or pathname. For example, a relative path might be just the name of a directory (i.e., myfiles), while an absolute path would include the full path to that directory (i.e., C:\Users\MyUser\myfiles).

4. createServer is a function used to create a web server in Node.js. The server can be configured to respond to various requests and send back appropriate responses.

5. Anonymous functions are functions that have no name. They are defined and invoked within a single line and can be passed as arguments to other functions.

6. server.listen is used to initiate the server and start it listening for requests. It’s like setting up a telephone listener on a certain port. This port is specified in the listen function and is used to determine which server requests are accepted and responded to. It is necessary because without it, the server would be unable to accept and respond to requests.
 */
