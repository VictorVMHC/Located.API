const { response, request, json } = require('express');
const jwt = require('jsonwebtoken');
const GoogleUser = require('../Models/GoogleUser')


const googleuserPost = async ( req, res = response ) => {
    const { name, email, givenName, photo, googletoken} = req.body;
    try{
        const googleuser = new GoogleUser({name, email,givenName,photo});

        await googleuser.save();

        const token = jwt.sign({id: googleuser._id, email: googleuser.email}, process.env.TOKEN_SECRET,{
            expiresIn: '30 days'
        });

        return res.status(200).json({
            googleuser,
            token
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the user',
            err
        });
    }
}

const googleuserGet =  async (req = request, res = response ) => { 
    const tokenDecoded = req.tokenDecoded
    try{
        const googleuser = await GoogleUser.findById(tokenDecoded.id)
        if(!googleuser){
            return res.status(404).json({ error: 'User not found' }); 
        }

        return res.status(200).json({
            msg: 'User found',
            googleuser
        })
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while finding the user',
            emailRequested: tokenDecoded.email,
        });
    }
}

const googleuserDelete = async ( req = request, res = response ) => {
    const { email } = req.params.email;
    try {
        const response = await GoogleUser.findOneAndUpdate(email, {state: false}, {new: true});
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
    googleuserPost,
    googleuserGet,
    googleuserDelete,
}