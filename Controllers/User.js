const { response } = require('express');
const User = require('../Models/User')

const userPost = async ( req, res = response ) => {
    const { name, email, password, phone } = req.body;

    const user = new User({name, email, password, phone})

    try{
        await user.save();
        res.status(200).json({
            msg: 'User created successfully',
            user
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while saving the user',
            user
        });
    }
}

const userGet = async (req, res = response ) => {
    
    const email = req.params.email;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ error: 'User not found' }); 
        }
        res.status(200).json({
            msg: 'User found',
            user
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while saving the user',
            emilRequested: email,
        });
    }
}

const userPut = async ( req, res = response ) => {

}

module.exports = {
    userPost,
    userGet
}