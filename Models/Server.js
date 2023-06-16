const express = require('express');
const dbConnection = require('../Database/config');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userRootPaht = '/api/users';
        this.localRootPath = '/api/locals';
        this.producsRootPath = '/api/locals';
        this.ConnectDb();
        this.middlewares();
        this.routes();
    }
    async ConnectDb(){
        await dbConnection();
    }
    middlewares() {
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.userRootPaht, require('../Routes/User') );
        this.app.use(this.localRootPath, require('../Routes/Locals') );
        this.app.use(this.producsRootPath, require('../Routes/Producs') );
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server Running on the port:', this.PORT)
        });
    }
}

module.exports = Server;