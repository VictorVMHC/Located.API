const express = require('express');
const dbConnection = require('../Database/config');
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.userRootPath = '/api/users';
        this.authRootPath = '/auth';
        this.localRootPath = '/api/locals';
        this.productsRootPath = '/api/products';
        this.guestUserRootPath = '/api/guest/users';
        this.verifyEmailRootPath = '/api/verifyEmail';
        this.likeRootPath = '/api/like';
        this.likedCommentPath = this.likeRootPath + '/comment';
        this.likedLocalPath = this.likeRootPath + '/local';
        this.likedProductPath = this.likeRootPath + '/product';
        this.dislikeRootPath = '/api/dislike';
        this.dislikeCommentPath = this.dislikeRootPath + '/comment';
        this.businessTypes = '/api/businessTypes';
        this.categoriesPath = '/api/categories';
        this.verifyUserInfoPath = '/api/verifyUserInfo';
        this.uploadImagePath = '/api/uploadImage';
        this.googleUserRootPath = '/api/google/users';

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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {
        this.app.use(this.userRootPath, require('../Routes/User') );
        this.app.use(this.localRootPath, require('../Routes/Locals') );
        this.app.use(this.productsRootPath, require('../Routes/Products') );
        this.app.use(this.authRootPath, require('../Routes/Auth') );
        this.app.use(this.guestUserRootPath, require('../Routes/GuestUser') );
        this.app.use(this.verifyEmailRootPath, require('../Routes/VerifyEmail') );
        this.app.use(this.dislikeCommentPath, require('../Routes/DislikeComment') );
        this.app.use(this.likedCommentPath, require('../Routes/LikeComments') );
        this.app.use(this.likedLocalPath, require('../Routes/LikedLocals') );
        this.app.use(this.likedProductPath, require('../Routes/LikeProducts') );
        this.app.use(this.businessTypes, require('../Routes/BusinessTypes') );
        this.app.use(this.categoriesPath, require('../Routes/Categories') );
        this.app.use(this.verifyUserInfoPath, require('../Routes/VerifyUserInfo') );
        this.app.use(this.googleUserRootPath, require('../Routes/GoogleUser') );
    }
    
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('Server Running on the port:', this.PORT)
        });
    }
    
}

module.exports = Server;