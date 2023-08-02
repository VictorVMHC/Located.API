const { response, request } = require ('express');
const bcryptjs = require('bcryptjs');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const addEmailToVerify = async (req = request, res = response) => {
    const { email } = req.body;
    try{

        const a = Math.random() * (100000-1) + 100000
        console.log(`Random value between 1 and 10 is ${a}`);

        return res.status(200).json({
            msg: 'success'
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while trying to log in user',
            err
        });
    }
}

const verifyCode = async (req = request, res = response) => {
    const tokenDecoded = req.tokenDecoded
    try{
        const user = await User.findById(tokenDecoded.id)
        if(!user){
            return res.status(404).json({ error: 'User not found' }); 
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET,{
            expiresIn: '30 days'
        });

        return res.status(200).json({
            user,
            token
        })
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while finding the user',
            emailRequested: tokenDecoded.email,
        });
    }
}

module.exports = {
    addEmailToVerify,
    verifyCode
}