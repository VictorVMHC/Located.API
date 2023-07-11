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
        
        const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET,{
            expiresIn: '30 days'
        });

        return res.status(200).json({
            msg: 'User',
            token: token
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while trying to log in user',
            err
        });
    }
}

module.exports = {
    AuthLogin
}