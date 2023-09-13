const {response, request} = require('express');
const LikeLocal = require('../Models/LikedLocals');
const User = require('../Models/User');
const Locals = require('../Models/Locals');

const likeLocalPost = async (req, res = response) =>{
    const {userId, localId} = req.body;
    try{
        const user = await User.findById(userId)
        const local = await Locals.findById(localId)

        if(!user || !local ){
            return res.status(404).json({
                error: "User or locals not found"
            })
        }
        
        const likedLocal = new LikeLocal({userId,localId});

        await likedLocal.save();

        return res.status(200).json({
            msg: 'The like was created successfully',
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the like to the local',
            err
        });
    }
}

const likeLocalGet = async (req = request, res = response) =>{
    const id = req.params.Id;
    try{
        const likedLocal = await LikeLocal.findById(id);

        if(!likedLocal){
            return res.status(404).json({ error: 'No Like Found'});
        }
        res.status(200).json({
            msg: 'like local found',
            likedLocal: likedLocal
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like local'
        });
    }
}

const likeLocalGetCount = async (req = request, res = response) =>{
    const id = req.params.localId;
    try{
        const localLikes = await LikeLocal.countDocuments({localId: id})

        return res.status(200).json({
            msg: 'Local likes found',
            localLikes
        });

    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like local'
        });
    }
}

const likeLocalDelete = async (req=request, res=response ) => {
    const id = req.params.Id;
    try{
        const likeLocalResponse = await LikeLocal.findByIdAndUpdate(id, {state: false}, {new: true});
        res.status(200).json({
            msg: 'Like has been deleted',
            likeLocalResponse,
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while trying to delete the Like',
            emailRequested: id,
        });
    }
}

module.exports={
    likeLocalPost,
    likeLocalGet,
    likeLocalDelete,
    likeLocalGetCount
}