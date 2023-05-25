const User = require('../Models/User');

const existEmail = async (email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){ 
        throw new Error(`The email: ${email} is already registered`);
    }
};

module.exports = {
    existEmail
}