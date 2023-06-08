const { response, request } = require ('express');
const bcryptjs = require('bcryptjs');
const Locals = require ('../Models/Locals');

const localsPost = async (req, res = response) =>{
    const {localId, name, adress, isVerify, products, schedules, rate, quantityRate, tags} = req.body;

    const locals = new Locals({localId, name, adress, isVerify, products, schedules, rate, quantityRate, tags})

    try{
        await locals.save();
        res.status(200).json({
            msg: 'Local was created successfully',
            locals
        });
    }catch{
        res.status(500).json({
            msg: 'Error traying to create the local',
            locals
        });
    }

}

module.exports = {
    localsPost
}