const { response, request, json } = require('express');
const Reply = require('../Models/Reply')
const User = require('../Models/User')
const Comment = require('../Models/Comment');
const classifier = require('../Middleware/NaiveBayesMiddleware')();

const replyPost = async(req, res = response)=>{
    try{
        const {commentId, userId, replied, userRepliedId} = req.body;
        const comment = await Comment.findById(commentId)
        const user = await User.findById(userId)

        if(!user || !comment ){
            return res.status(404).json({
                error: "User or comment not found"
            })
        }
        const label = classifier.classify(replied)
        const reply = new Reply({commentId, userId, replied, userRepliedId,label})

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
    const id = req.params.Id;
    try{
        const reply = await Reply.findById(id);
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

const getReplyByCommentId = async (req = request,  res = response) =>{
    try{
        const commentId = req.params.commentId;
        const { page = 1, limit = 10 } = req.query;
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitValue = parseInt(limit);
    
        const totalReplies = await Reply.countDocuments({ commentId });

        if (totalReplies.length === 0) {
            return res.status(404).json({
                err: 'No replies were found'
            });
        }

        const reply = await Reply.find({ commentId })
            .populate('userRepliedId', 'name')
            .populate('userId', 'image name')
            .skip(skip)
            .limit(limitValue);
            
        return res.status(200).json({
            msg: 'replies found',
            reply,
            totalPages: Math.ceil(totalReplies / limitValue),
            currentPage: parseInt(page),
            totalComments: totalReplies
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the reply'
        });
    }
}

const replyPut = async ( req, res ) => {
    const id = req.params.Id;
    const {_Id, ...replyData} = req.body;
    try{
        const replyUpdate = await Reply.findByIdAndUpdate(id, replyData, { new: true })
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
    const id = req.params.Id;
    try{
        const replyResponse = await Reply.findByIdAndUpdate(id, {state: false}, {new: true});
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
    replyDelete,
    getReplyByCommentId
}