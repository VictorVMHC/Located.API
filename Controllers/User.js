const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User')


const userPost = async ( req, res = response ) => {
    const { name, username, email, password, phone, age } = req.body;
    const user = new User({name, email,username, password, phone, age})
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    try{
        await user.save();
        const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET,{
            expiresIn: '10 s'
        })
        res.status(200).json({
            msg: 'User created successfully',
            user,
            token
        });
    }catch{
        res.status(500).json({
            msg: 'An error occurred while saving the user',
            user
        });
    }
}

const userGet =  async (req, res = response ) => { 
    const token = req.headers['x-token'];
    const email = req.params.email;
    let tokenDecoded;
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).json({ valid: false, error: 'Invalid token or expired' });
        }
        tokenDecoded = decoded;
    });

    try{
        const user = await User.findById(tokenDecoded._id)
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

const usersGet = async (req,  res = response) =>{
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
        const response = await User.findOneAndRemove(email, {state: false}, {new: true});
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