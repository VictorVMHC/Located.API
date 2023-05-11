const { response } = require('express');

const userPost = async ( req, res = response ) => {
    const { name, userName, email, password, rol } = req.body;

    res.status(200).json({
        msg: 'Post API request',
        name,
        userName, 
        email, 
        password,
        rol    
    });
}

module.exports = {
    userPost
}