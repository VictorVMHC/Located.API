const { response, request } = require('express');
const   Comment = require('../Models/Comment')
const User = require('../Models/User')
const Local = require('../Models/Locals')

const commentPost = async( req, res = response ) => {
    const {localId, userId, comments} = req.body;
    try{
        const comment = new Comment({localId, userId, comments});
        const local = await Local.findById(localId)
        const user = await User.findById(userId)
        comment.localId = local
        comment.userId = user
        await comment.save()
        return res.status(200).json({
            msg: 'Comment created successfully',
            comment,
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the comment',
            err
        });
    }
}

const commentGet = async (req = request,  res = response) =>{
    const _ID = req.params.Id;
    try{
        const comment = await Comment.findById(_ID);
        if(!comment){
            return res.status(404).json({ error: 'NO COMMENT'});
        }
        res.status(200).json({
            msg: 'Comment found',
            comment
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the comment'
        });
    }
}

const commentPut = async ( req, res ) => {
    const comment_id = req.params.Id;
    const {_Id, ...commentData} = req.body;
    try{
        const commentUpdate = await Comment.findByIdAndUpdate(comment_id, commentData, { new: true })
        if(!commentUpdate){
            return res.status(404).json({ error: 'Comment not found to update it' });
        }
        res.status(200).json({
            msg: 'Comment updated successfully',
            comment: commentUpdate
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the comment',
            emailRequested: commentId,
            dataToUpdate: data
        });
    }
}

const commentDelete = async (req=request, res=response ) => {
    const comment_id = req.params.Id;
    try{
        const commentResponse = await Comment.findByIdAndUpdate(comment_id, {state: false}, {new: true});
        res.status(200).json({
            msg: 'comment has been deleted',
            commentResponse
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleting the comment',
            emailRequested: comment_id,
        });
    }
}

module.exports = {
    commentPost,
    commentGet,
    commentPut,
    commentDelete
    
}