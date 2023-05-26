const User = require('../Models/User');

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

module.exports = {
    existEmail,
    existPhone
}