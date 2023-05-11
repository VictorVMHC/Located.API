const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userRootPaht = '/api/users';
        this.middlewares();
        this.routes();
    }
    
    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        console.log('routes');

        this.app.use(this.userRootPaht, require('../Routes/User') );
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server Running on the port: ', this.PORT)
        });
    }
}
module.exports = Server;