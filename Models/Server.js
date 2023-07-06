const express = require('express');
const dbConnection = require('../Database/config');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userRootPath = '/api/users';
        this.localRootPath = '/api/locals';
        this.productsRootPath = '/api/products';
        this.ConnectDb();
        this.middleware();
        this.routes();
    }
    async ConnectDb(){
        await dbConnection();
    }
    middleware() {
        this.app.use(express.json());
    }
    routes() {
        this.app.use(this.userRootPath, require('../Routes/User') );
        this.app.use(this.localRootPath, require('../Routes/Locals') );
        this.app.use(this.productsRootPath, require('../Routes/Products') );
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server Running on the port:', this.PORT)
        });
    }
}

module.exports = Server;