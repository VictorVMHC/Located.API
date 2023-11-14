const { response, request } = require('express');
const   LikeComment = require('../Models/LikeComments')
const User = require('../Models/User')
const Comment = require('../Models/Comment');
const DisLikeComment = require('../Models/DislikeComment');

const DislikeCommentPost = async( req, res = response ) => {
    const {userId, commentId} = req.body;
    try{
        const user = await User.findById(userId)
        const comment = await Comment.findById(commentId)

        if(!user || !comment ){
            return res.status(404).json({
                error: "User or comment not found"
            })
        }
        
        const dislikedComment = new DisLikeComment({userId, commentId});
        await dislikedComment.save()
        
        return res.status(200).json({
            msg: 'dislikedComment created successfully',
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the like',
            err
        });
    }
}

const DislikeCommentGet = async (req = request,  res = response) =>{
    const id = req.params.Id;
    try{
        const dislikedComment = await dislikedComment.findById(id);
        if(!dislikedComment){
            return res.status(404).json({ error: 'NO LIKE'});
        }
        res.status(200).json({
            msg: 'like comment found',
            dislikedComment: dislikedComment
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like comment'
        });
    }
}

const DislikeCommentDelete = async (req=request, res=response ) => {
    const id = req.params.Id;
    try{
        const dislikeCommentResponse = await DisLikeComment.findByIdAndUpdate(id, {state: false}, {new: true});
        res.status(200).json({
            msg: 'Like has been deleted',
            likeCommentResponse: dislikeCommentResponse
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleting the Like',
            emailRequested: id,
        });
    }
}


module.exports = {
    DislikeCommentPost, 
    DislikeCommentGet,
    DislikeCommentDelete
}