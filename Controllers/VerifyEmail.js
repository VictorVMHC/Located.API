const { response, request } = require ('express');
const jwt = require('jsonwebtoken');
const VerifyEmail = require('../Models/VerifyEmail');
const addEmailToVerify = async (req = request, res = response) => {
    const { email } = req.body;
    try{

        const ran = Math.floor(Math.random() * 1000000);
        const code = String(ran).padStart(6, '0');
        const emailToVerify = new VerifyEmail({email, code});
        await emailToVerify.save();

        return res.status(200).json({
            msg: 'success'
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while trying to save email to verify',
            err
        });
    }
}

const verifyCode = async (req = request, res = response) => {
    const { email, code } = req.body;
    try{
        const check = await VerifyEmail.findOne({email})

        if(!check){
            return res.status(401).json({
                msg: 'Expired code'
            })
        }

        if( code != check.code ){
            return res.status(400).json({
                msg: 'Invalid code'
            })
        }

        await VerifyEmail.deleteOne({email});
        
        return res.status(200).json({
            msg: 'Email validated'
        })
        
    }catch(error){
        return res.status(500).json({
            msg: 'An error occurred while getting the code',
            error
        });
    }
}

module.exports = {
    addEmailToVerify,
    verifyCode
}