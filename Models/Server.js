const express = require('express');
const dbConnection = require('../Database/config');


class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userRootPaht = '/api/users';
        this.localRootPath = '/api/local';
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
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server Running on the port:', this.PORT)
        });
    }
}

module.exports = Server;