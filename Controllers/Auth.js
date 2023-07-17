const { response, request } = require ('express');
const bcryptjs = require('bcryptjs');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const AuthLogin = async (req = request, res = response) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({ error: 'User not found' });
        }

        const comparePassword = await bcryptjs.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET,{
            expiresIn: '30 days'
        });

        return res.status(200).json({
            user,
            token: token
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while trying to log in user',
            err
        });
    }
}

const Auth = async (req = request, res = response) => {
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


const test = async (req = request, res = response) => {
    try{
        return res.status(200).json({
            msg: 'Connection success'
        })
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred',
        });
    }
}

module.exports = {
    AuthLogin,
    Auth,
    test
}