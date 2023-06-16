const { response, request } = require('express');
const Producs = require('../Models/Producs')

const producsPost = async ( req, res = response ) => {
    const { producName, price, img, punctation, descripcion, tags } = req.body;
    const producs = new Producs({producName, price, img, punctation, descripcion, tags })
    try{
        await producs.save();
        res.status(200).json({
            msg: 'User created successfully',
            producs
        })
    }catch{
        res.status(500).json({
            msg: 'An error occurred while saving the producs',
            producs
        });
    }
}


const producsGet = async (req, res = response ) => { 
    const _Id = req.params.Id;
    try{
        const producs = await Producs.findOne({_Id});
        if(!producs){
            return res.status(404).json({ error: 'producs not found' }); 
        }
        res.status(200).json({
            msg: 'producs found',
            producs
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while finding the producs',
            emailRequested: _Id,
        });
    }
}


module.exports = {
    producsPost,
    producsGet,
}