const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../Models/User')

const userPost = async ( req, res = response ) => {
    const { name, email, password, phone } = req.body;
    const user = new User({name, email, password, phone})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    try{
        await user.save();
        res.status(200).json({
            msg: 'User created successfully',
            user
        });
    }catch{
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
            msg: 'An error occurred while finding the user',
            emailRequested: email,
        });
    }
}

const userPut = async ( req, res ) => {
    const emailParams = req.params.email;
    const {email, ...userData} = req.body;
    try{
        const userUpdate = await User.findOneAndUpdate({email: emailParams}, userData, { new: true })
        if(!userUpdate){
            return res.status(404).json({ error: 'User not found to update it' });
        }
        res.status(200).json({
            msg: 'User updated successfully',
            user: userUpdate
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the user',
            emailRequested: email,
            dataToUpdate: data
        });
    }
}

const userDelete = async ( req = request, res = response ) => {
    const { email } = req.params.email;
    try {
        const response = await User.findOneAndUpdate(email, {state: false}, {new: true});
        res.status(200).json({
            msg: "User deleted successfully",
            "email": email,
            response
        });
    } catch (error) {
        res.status(500).json({
            msg: 'An error occurred while deleting the user',
            emailRequested: email,
        });
    }
}

module.exports = {
    userPost,
    userGet,
    userPut,
    userDelete
}