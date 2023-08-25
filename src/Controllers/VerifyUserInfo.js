const { response, request } = require ('express');


const getCheckUserInfo = async (req = request, res = response) => {
    try{
        
        return res.status(200).json({
            msg: 'success'
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while checking user information',
            err
        });
    }
}

module.exports = {
    getCheckUserInfo,
}