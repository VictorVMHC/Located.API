const { response, request, json } = require('express');
const Reply = require('../Models/Reply')
const User = require('../Models/User')
const Comment = require('../Models/Comment')

const replyPost = async(req, res = response)=>{
    const {commentId, userId, replied} = req.body;
    try{
        const reply = new Reply({commentId, userId, replied})
        const comment = await Comment.findById(commentId)
        const user = await User.findById(userId)
        reply.commentId = comment
        reply.userId = user
        await reply.save()
        return res.status(200).json({
            msg: 'reply created successfully',
            reply,
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the reply',
            err
        });
    }
}

const replyGet = async (req = request,  res = response) =>{
    const replyId = req.params.Id;
    try{
        const reply = await Reply.findById(replyId);
        if(!reply){
            return res.status(404).json({ error: 'No reply'});
        }
        res.status(200).json({
            msg: 'reply found',
            reply
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the reply'
        });
    }
}

const replyPut = async ( req, res ) => {
    const replyId = req.params.Id;
    const {_Id, ...replyData} = req.body;
    try{
        const replyUpdate = await Reply.findByIdAndUpdate(replyId, replyData, { new: true })
        if(!replyUpdate){
            return res.status(404).json({ error: 'reply not found to update it' });
        }
        res.status(200).json({
            msg: 'reply updated successfully',
            comment: replyUpdate
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the reply',
            emailRequested: replyId,
            dataToUpdate: data
        });
    }
}

const replyDelete = async (req=request, res=response ) => {
    const replyId = req.params.Id;
    try{
        const replyResponse = await Reply.findByIdAndUpdate(replyId, {state: false}, {new: true});
        res.status(200).json({
            msg: 'reply has been deleted',
            replyResponse
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleting the reply',
            emailRequested: replyId,
        });
    }
}

module.exports = {
    replyPost,
    replyGet,
    replyPut,
    replyDelete
}