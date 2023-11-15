const { response, request, json } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const googleUserPost = async ( req, res = response ) => {

    const { name, email, photo, id } = req.body;

    const username = email;
    
    try{

        const googleUser = new User({name, email, image: photo, username, googleId: id, google: true});

        await googleUser.save();

        const token = jwt.sign({id: googleUser._id, email: googleUser.email }, process.env.TOKEN_SECRET,{
            expiresIn: '30 days'
        });

        return res.status(200).json({
            user: googleUser,
            token
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'An error occurred while saving the user',
            err
        });
    }
}

const googleUserDelete = async ( req = request, res = response ) => {
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
    googleUserPost,
    googleUserDelete,
}