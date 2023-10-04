const { response, request } = require('express');
const   LikeComment = require('../Models/LikeComments')
const User = require('../Models/User');
const Reply = require('../Models/Reply');
const LikeReply = require('../Models/LikeReply');

const likeReplyPost = async( req, res = response ) => {
    const {userId, replyId} = req.body;
    try{
        const user = await User.findById(userId)
        const reply = await Reply.findById(replyId)

        if(!user || !reply ){
            return res.status(404).json({
                error: "User or comment not found"
            })
        }
        
        const likedReply = new LikeReply({userId, replyId});
        await likedReply.save()
        
        return res.status(200).json({
            msg: 'like created successfully',
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the like',
            err
        });
    }
}

const likeReplyGet = async (req = request,  res = response) =>{
    const id = req.params.Id;
    try{
        const likedReply = await LikeReply.findById(id);

        if(!likedReply){
            return res.status(404).json({ error: 'NO LIKE'});
        }
        
        res.status(200).json({
            msg: 'like comment found',
            likedReply
        })

    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like comment'
        });
    }
}

const likeReplyDelete = async (req=request, res=response ) => {
    const likeReply_id = req.params.Id;
    try{
        const likeReply = await LikeComment.findByIdAndUpdate(likeReply_id, {state: false}, {new: true});

        res.status(200).json({
            msg: 'Like has been deleted',
            likeReply
        });

    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleting the Like',
            reply: likeReply_id,
        });
    }
}


module.exports = {
    likeReplyPost, 
    likeReplyGet,
    likeReplyDelete
}