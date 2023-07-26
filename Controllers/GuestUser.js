const { response } = require('express');
const jwt = require('jsonwebtoken');
const GuestUser = require('../Models/GuestUser');


const GuestUserPost = async (_, res = response) => {
    try{
        const guestUser = new GuestUser();

        await guestUser.save();

        const token = jwt.sign({id: guestUser._id, logDate: guestUser.logDate}, process.env.TOKEN_SECRET,{
            expiresIn: '1 days'
        });

        return res.status(200).json({
            guestUser,
            token
        });

    }catch(error){
        return res.status(500).json({
            msg: 'An error occurred while saving the guest user',
            error
        });
    }
}

const GuestUserDelete = async ( req = request, res = response ) => {
    try {
        const tokenDecoded = req.tokenDecoded
        const response = await GuestUser.findOneAndUpdate( { _id: tokenDecoded.id }, {state: false}, {new: true});
        res.status(200).json({
            msg: "User deleted successfully",
            response
        });
    } catch (error) {
        res.status(500).json({
            msg: 'An error occurred while deleting the user',
            error
        });
    }
}


module.exports = {
    GuestUserPost,
    GuestUserDelete
}