const {response, request} = require('express');
const LikeLocal = require('../Models/LikeLocals');
const User = require('../Models/User');
const Locals = require('../Models/Locals');

const likeLocalPost = async (req, res = response) =>{
    const {userId, localId} = req.body;
    try{
        const likelocal = new LikeLocal({userId,localId});
        const user = await User.findById(userId)
        const local = await Locals.findById(localId)
        likelocal.userId = user
        likelocal.localId = local
        await likelocal.save()
        return res.status(200).json({
            msg: 'The like was created succesfully',
            local,
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the like',
            err
        });
    }
}

const likeLocalGet = async (req = request, res = response) =>{
    const _ID = req.params.Id;
    try{
        const likelocal = await LikeLocal.findById(_ID);
        if(!likelocal){
            return res.status(404).json({ error: 'No Like Found'});
        }
        res.status(200).json({
            msg: 'like local found',
            likelocal
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like local'
        });
    }
}

const likeLocalDelete = async (req=request, res=response ) => {
    const likeLocal_id = req.params.Id;
    try{
        const likeLocalResponse = await LikeLocal.findByIdAndUpdate(likeLocal_id, {state: false}, {new: true});
        res.status(200).json({
            msg: 'Like has been deleted',
            likeLocalResponse,
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while traying to delete the Like',
            emailRequested: likeLocal_id,
        });
    }
}

module.exports={
    likeLocalPost,
    likeLocalGet,
    likeLocalDelete,
}