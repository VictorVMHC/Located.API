const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User')


const userPost = async ( req, res = response ) => {
    const { name, username, email, password, phone, age } = req.body;
    try{
        const user = new User({name, email,username, password, phone, age});
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        await user.save();
        return res.status(200).json({
            msg: 'User created successfully',
            user,
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the user',
            err
        });
    }
}

const userGet =  async (req = request, res = response ) => { 
    const tokenDecoded = req.tokenDecoded
    try{
        const user = await User.findById(tokenDecoded.id)
        if(!user){
            return res.status(404).json({ error: 'User not found' }); 
        }

        return res.status(200).json({
            msg: 'User found',
            user
        })
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while finding the user',
            emailRequested: tokenDecoded.email,
        });
    }
}

const usersGet = async (req = request,  res = response) =>{
    try{
        const users = await User.find();
        if(users){
            return res.status(404).json({ error: 'NO USERS'});
        }
        res.status(200).json({
            users
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the users'
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
    usersGet,
    userPut,
    userDelete
}