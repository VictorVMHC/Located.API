const { response } = require('express');
const User = require('../Models/User')

const userPost = async ( req, res = response ) => {
    const { name, email, password, phone } = req.body;

    const user = new User({name, email, password, phone})
    await user.save();
    res.status(200).json({
        msg: 'Post API request',
        user
    });
}

module.exports = {
    userPost
}