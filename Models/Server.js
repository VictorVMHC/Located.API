const express = require('express');
const dbConnection = require('../Database/config');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userRootPath = '/api/users';
        this.authRootPath = '/auth';
        this.localRootPath = '/api/locals';
        this.productsRootPath = '/api/products';
        this.commentRootPath = '/api/comments';
        this.replyRootPath = '/api/reply'
        this.likeCommentRootPath = '/api/likeComments'
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
        this.app.use(this.authRootPath, require('../Routes/Auth') );
        this.app.use(this.commentRootPath, require('../Routes/Comment'));
        this.app.use(this.replyRootPath, require('../Routes/Reply'));
        this.app.use(this.likeCommentRootPath, require('../Routes/LikeComments'));
    }
    
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server Running on the port:', this.PORT)
        });
    }
}

module.exports = Server;