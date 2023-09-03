const User = require('../Models/User');
const Locals = require('../Models/Locals');
const GoogleUser = require('../Models/GoogleUser');

const existEmail = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){ 
        throw new Error(`The email: ${email} is already registered`);
    }
};

const existPhone = async (phone = '') => {
    const existPhone = await User.findOne({phone});
    if(existPhone){ 
        throw new Error(`The phone: ${phone} is already registered`);
    }
};

const existUserName = async (username = '') => {
    const existUserName = await User.findOne({username});
    if(existUserName){ 
        throw new Error(`The username: ${username} is already registered`);
    }
};

const existLocal = async (name = '')=>{
    const existLocal = await Locals.findOne({name});
    if(existLocal){
        throw new Error(`The Local: ${name} is already registered`);
    }
};

const existGoogleEmail = async (email = '') => {
    const existGoogleEmail = await GoogleUser.findOne({email});
    if(existGoogleEmail){ 
        throw new Error(`The email: ${email} is already registered`);
    }
};

const existGoogleUserName = async (givenName = '') => {
    const existGoogleUserName = await GoogleUser.findOne({givenName});
    if(existGoogleUserName){ 
        throw new Error(`The username: ${givenName} is already registered`);
    }
};

module.exports = {
    existEmail,
    existPhone,
    existLocal,
    existUserName,
    existGoogleEmail,
    existGoogleUserName
}