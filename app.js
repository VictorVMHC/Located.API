require('dotenv').config();
const Server = require('./src/Models/Server');
const server = new Server();
server.listen();