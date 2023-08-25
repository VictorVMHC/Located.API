const { response, request, json } = require ('express');
const jwt = require('jsonwebtoken');
const VerifyEmail = require('../Models/VerifyEmail');
const { transporter, mailOptions } = require('../Utils/MailSenderConfig');
const { getMailEs, getMailEn } = require('../Utils/MailLanguages');
const { getCode } = require('../Utils/GenerateCode');

const addEmailToVerify = async (req = request, res = response) => {
    const { email, lang } = req.body;
    try{

        const code = getCode();

        const emailToVerify = new VerifyEmail({email, code});
        
        const mailOptions = lang == 'es' ? getMailEs(code, email) : getMailEn(code, email);

        const mailResponse = await transporter.sendMail(mailOptions);

            if(mailResponse.rejected.length > 0){
                return res.status(400).json({
                    msg: 'was not possible to sent the message',
                    mail: mailResponse.rejected
                });
            }

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
    const { email, code } = req.params;
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

const verifyDelete = async ( req = request, res = response ) => {
    const email  = req.params.email;
    try {
        const deleteVerifyEmail = await VerifyEmail.findOneAndDelete({ email: email });
        res.status(200).json({
            msg: "VerifyEmail deleted successfully",
            "email": email,
            deleteVerifyEmail
        });
    } catch (error) {
        res.status(500).json({
            msg: 'An error occurred while deleting the verify',
            emailRequested: email,
        });
    }
}

module.exports = {
    addEmailToVerify,
    verifyCode,
    verifyDelete
}