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

        const token = jwt.sign({id: user._id, email: user.email}, process.env.TOKEN_SECRET,{
            expiresIn: '30 days'
        });

        return res.status(200).json({
            user,
            token
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

const userPut = async (req, res) => {
    const tokenDecoded = req.tokenDecoded
    const {...userData } = req.body;
    try {

        const userUpdated = await User.findByIdAndUpdate({ _id: tokenDecoded.id }, userData, { new: true });

        if (!userUpdated) {
            return res.status(404).json({ error: 'User not found to update it' });
        }

        const token = jwt.sign({id: userUpdated._id, email: userUpdated.email}, process.env.TOKEN_SECRET,{
            expiresIn: '30 days'
        });

        res.status(200).json({
            msg: 'User updated successfully',
            user: userUpdated,
            token
        });

    } catch (err) {
        res.status(500).json({
            msg: 'An error occurred while updating the user',
            emailRequested: email,
            dataToUpdate: data
        });
    }
};

const userPasswordPut = async (req, res) => {
    const tokenDecoded = req.tokenDecoded
    const {password,newPassword} = req.body;
    try {
        const user = await User.findById(tokenDecoded.id);
        const comparePassword = await bcryptjs.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json({ error: 'Invalid Old Password' });
        }
        const salt = bcryptjs.genSaltSync();
        const newHashedPassword = bcryptjs.hashSync(newPassword, salt);
        user.password = newHashedPassword;
        
        await user.save();
        res.status(200).json({
        msg: 'User password updated successfully',
        user,
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the new password',
        });
    }
};


const userDelete = async ( req = request, res = response ) => {
    const  email = req.params.email;
    try {
        const deleteUser = await User.findOneAndDelete({email: email});
        res.status(200).json({
            msg: "User deleted successfully",
            "email": email,
            deleteUser
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
    userPasswordPut,
    userDelete
}