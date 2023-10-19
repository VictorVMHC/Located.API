const {response, request} = require('express');
const LikeLocal = require('../Models/LikedLocals');
const User = require('../Models/User');
const Locals = require('../Models/Locals');

const likeLocalPost = async (req, res = response) =>{
    try{
        const { localId } = req.body;
        const tokenDecoded = req.tokenDecoded;

        const [user, local] = await Promise.all([
            User.findById(tokenDecoded.id),
            Locals.findById(localId)
        ]);

        if(!user || !local ){
            return res.status(404).json({
                error: "User or locals not found"
            })
        }

        const existingLike = await LikeLocal.findOne({userId: tokenDecoded.id, localId});
      
        if(existingLike){
            return res.status(400).json({
                error: "The user has already liked this place"
            });
        }
        const likedLocal = new LikeLocal({userId: tokenDecoded.id,localId});
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

const likeLocalGet = async (req = request, res = response) => {
    const {idUser, idLocal} = req.params;
    try {
        const likedLocal = await LikeLocal.findOne({
            userId: idUser,
            localId: idLocal
        });

        if (!likedLocal) {
            return res.status(404).json({ error: 'No Like Found' });
        }

        res.status(200).json({
            msg: 'like local found',
            likedLocal: likedLocal
        });
    } catch(err) {
        res.status(500).json({
            msg: 'An error occurred while trying to find the like local'
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
    try{
        const { localId } = req.params;
        const tokenDecoded = req.tokenDecoded;

        const deleteLikeLocal = await LikeLocal.findOneAndDelete({ localId, userId: tokenDecoded.id });

        res.status(200).json({
            msg: 'Like has been deleted',
            deleteLikeLocal,
        });

    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while trying to delete the Like',
        });
    }
}

module.exports={
    likeLocalPost,
    likeLocalGet,
    likeLocalDelete,
    likeLocalGetCount
}