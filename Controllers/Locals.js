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

const localsPut = async ( req, res ) => {
    const localIdParams = req.params.localId;
    const {localId, ...localData} = req.body;
    try{
        const localUpdate = await Locals.findOneAndUpdate({localId: localIdParams}, localData, {new: true})
        if(!localUpdate){
            return res.status(404).json({error: 'store not found to update it'});
        }
        res.status(200).json({
            msg: 'store updated successfully',
            locals: localUpdate
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the store',
            emailRequested: localId,
            dataToUpdate: data
        });
    }
}

const localDelete = async ( req = request, res = response ) => {
    const { localId } = req.params.localId;
    try{
        const response = await Locals.findByIdAndRemove(localId, {state: false}, {new: true});
        res.status(200).json({
            msg: 'store deleted successfully',
            response
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleing the store',
            emailRequested: localId,
        });
    }
}

module.exports = {
    localsPost,
    localsPut,
    localDelete
}