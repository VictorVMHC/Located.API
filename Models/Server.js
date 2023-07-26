const express = require('express');
const dbConnection = require('../Database/config');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userRootPath = '/api/users';
        this.authRootPath = '/auth';
        this.localRootPath = '/api/locals';
        this.productsRootPath = '/api/products';
        this.guestUserRootPath = '/api/guest/users';
        this.ConnectDb();
        this.middleware();
        this.routes();
    }

    ConnectDb(){
        dbConnection();
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.userRootPath, require('../Routes/User') );
        this.app.use(this.localRootPath, require('../Routes/Locals') );
        this.app.use(this.productsRootPath, require('../Routes/Products') );
        this.app.use(this.authRootPath, require('../Routes/Auth') );
        this.app.use(this.guestUserRootPath, require('../Routes/GuestUser') );
    }
    
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server Running on the port:', this.PORT)
        });
    }
}

module.exports = Server;