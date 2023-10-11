const { response, request } = require('express');
const  LikeComment = require('../Models/LikeComments')
const User = require('../Models/User')
const Comment = require('../Models/Comment')

const likeCommentPost = async( req, res = response ) => {
    const {userId, commentId} = req.body;
    try{
        const user = await User.findById(userId)
        const comment = await Comment.findById(commentId)

        if(!user || !comment ){
            return res.status(404).json({
                error: "User or comment not found"
            })
        }
        
        const likedComment = new LikeComment({userId, commentId});
        await likedComment.save()
        
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

const likeCommentGet = async (req = request,  res = response) =>{
    const id = req.params.Id;
    try{
        const likedComment = await LikeComment.findById(id);
        if(!likedComment){
            return res.status(404).json({ error: 'NO LIKE'});
        }
        res.status(200).json({
            msg: 'like comment found',
            likedComment: likedComment
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like comment'
        });
    }
}

const likeCommentDelete = async (req=request, res=response ) => {
    try{
        const likeComment_id = req.params.Id;

        await LikeComment.findByIdAndRemove(likeComment_id);
        
        res.status(200).json({
            msg: 'Like has been deleted',
        });
        
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleting the Like',
            emailRequested: likeComment_id,
        });
    }
}


module.exports = {
    likeCommentPost, 
    likeCommentGet,
    likeCommentDelete
}