const { response, request } = require('express');
const   LikeComment = require('../Models/LikeComments')
const User = require('../Models/User')
const Comment = require('../Models/Comment')

const likeCommentPost = async( req, res = response ) => {
    const {userId, commentId} = req.body;
    try{
        const likecomment = new LikeComment({userId, commentId});
        const user = await User.findById(userId)
        const comment = await Comment.findById(commentId)
        likecomment.userId = user
        likecomment.commentId = comment
        await likecomment.save()
        return res.status(200).json({
            msg: 'like created successfully',
            comment,
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the like',
            err
        });
    }
}

const likeCommentGet = async (req = request,  res = response) =>{
    const _ID = req.params.Id;
    try{
        const likecomment = await LikeComment.findById(_ID);
        if(!likecomment){
            return res.status(404).json({ error: 'NO LIKE'});
        }
        res.status(200).json({
            msg: 'like comment found',
            likecomment
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like comment'
        });
    }
}

const likeCommentPut = async ( req, res ) => {
    const likeComment_id = req.params.Id;
    const {_Id, ...likeCommentData} = req.body;
    try{
        console.log(likeCommentData.userId)
        const user = await User.findById(likeCommentData.userId)
        const comment = await Comment.findById(likeCommentData.commentId)
        const likeCommentUpdate = await LikeComment.findByIdAndUpdate(likeComment_id, likeCommentData, { new: true })
        if(!likeCommentUpdate){
            return res.status(404).json({ error: 'Like not found to update it' });
        }
        res.status(200).json({
            msg: 'Like updated successfully',
            comment: likeCommentUpdate
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the Like',
            emailRequested: likeComment_id,
            dataToUpdate: data
        });
    }
}

const likeCommentDelete = async (req=request, res=response ) => {
    const likeComment_id = req.params.Id;
    try{
        const likeCommentResponse = await LikeComment.findByIdAndUpdate(likeComment_id, {state: false}, {new: true});
        res.status(200).json({
            msg: 'Like has been deleted',
            likeCommentResponse
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
    likeCommentPut,
    likeCommentDelete
}