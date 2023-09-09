const { response, request } = require ('express');
const Locals = require ('../Models/Locals');
const User = require('../Models/User');

const localsPost = async (req, res = response) =>{
    try {
        const tokenDecoded = req.tokenDecoded;
        const {
            name,
            description,
            address,
            businessType,
            country,
            state,
            town,
            postalCode,
            location,
            contact,
            schedules,
            tags
        } = req.body;

        const locals = new Locals({
            name,
            description,
            address,
            businessType,
            country,
            state,
            town,
            postalCode,
            location,
            schedules,
            contact,
            tags
        });

        const user = await User.findById(tokenDecoded.id);

        if (!user) {
            return res.status(400).json({
                msg: 'Error trying to create the local'
            });
        }

        const newLocal = await locals.save();

        user.locals.push(newLocal._id);
        user.haveLocals = true;
        await user.save();

        res.status(200).json({
            msg: 'Local was created successfully',
            locals: newLocal
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error trying to create the local'
        });
    }
}
const localsGet = async (req, res = response ) =>{
    const _Id = req.params.Id;
    try{
        const locals = await Locals.findById(_Id)
        if(!locals){
            return res.status(400).json({error: 'Local not found'});
        }
        res.status(200).json({
            msg: 'Local Found',
            locals
        })
    }catch(err){
        res.status(500).json({
            msg: 'Error while trying to find the local',
            emailRequested: _Id,
        });
    }
}

const localsPut = async ( req, res ) => {
    const localIdParams = req.params.Id;
    const {_Id, ...localData} = req.body;
    try{
        const localUpdate = await Locals.findByIdAndUpdate(localIdParams, localData, {new: true});

        if(!localUpdate){
            return res.status(404).json({error: 'local not found to update it'});
        }
        
        res.status(200).json({
            msg: 'local updated successfully',
            locals: localUpdate
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the local',
            emailRequested: localId,
            dataToUpdate: data
        });
    }
}

const localDelete = async ( req = request, res = response ) => {
    const localIdParams = req.params.Id;
    try{
        const response = await Locals.findByIdAndUpdate(localIdParams, {state: false}, {new: true});
        res.status(200).json({
            msg: 'store deleted successfully',
            response
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleting the store',
            emailRequested: _Id,
        });
    }
}

module.exports = {
    localsPost,
    localsGet,
    localsPut,
    localDelete,
}