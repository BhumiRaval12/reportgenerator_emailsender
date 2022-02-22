const http = require('http');
const app = require('./app');

const port = 8080

const server = http.createServer(app);
console.log("hello");

server.listen(port, () => {
     console.log('Server is listening on port: ' + port);
});