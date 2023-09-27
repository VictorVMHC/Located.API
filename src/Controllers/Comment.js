const { response, request } = require('express');
const   Comment = require('../Models/Comment')
const User = require('../Models/User')
const Local = require('../Models/Locals');
const Reply = require('../Models/Reply');
const classifier = require('../Middleware/NaiveBayesMiddleware')();


const commentPost = async( req, res = response ) => {
    const {localId, userId, comment} = req.body;
    try{

        const local = await Local.findById(localId)
        const user = await User.findById(userId)

        if(!user || !local ){
            return res.status(404).json({
                error: "User or local not found"
            })
        }

        const label = classifier.classify(comment)

        const newComment = new Comment({localId, userId, comment, label});

        await newComment.save();

        return res.status(200).json({
            msg: 'Comment created successfully',
            newComment,
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the comment',
            err
        });
    }
}

const commentGet = async (req = request,  res = response) =>{
    const id = req.params.Id;
    try{
        const comment = await Comment.findById(id);
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

const searchByLocalId = async (req = request, res = response) => {
    try {
        const { localId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const totalComments = await Comment.countDocuments({ localId });

        if (totalComments.length === 0) {
            return res.status(404).json({
                err: 'No comments were found'
            });
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitValue = parseInt(limit);
    
        const comments = await Comment.find({ localId })
            .skip(skip)
            .limit(limitValue);
    
        const commentsWithReplies = [];
    
        for (const comment of comments) {

            const replies = await Reply.countDocuments({ commentId: comment._id });
            
            const commentData = {
                localId: comment.localId,
                userId: comment.userId,
                comment: comment.comment,
                label: comment.label,
                countReplies: replies
            };

            commentsWithReplies.push(commentData);
        }
    
        return res.status(200).json({
            comments: commentsWithReplies,
            totalPages: Math.ceil(totalComments / limitValue),
            currentPage: parseInt(page),
            totalComments: totalComments
        });

    } catch (error) {
        res.status(500).json({ 
            error: 'Error trying to get the comment and its answers' 
        });
    }
};





const commentPut = async ( req, res ) => {
    const id = req.params.Id;
    const {_Id, ...commentData} = req.body;
    try{
        const commentUpdate = await Comment.findByIdAndUpdate(id, commentData, { new: true })
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
            emailRequested: comment_id,
            dataToUpdate: commentData
        });
    }
}

const commentDelete = async (req=request, res=response ) => {
    const id = req.params.Id;
    try{
        const commentResponse = await Comment.findByIdAndUpdate(id, {state: false}, {new: true});
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
    commentDelete,
    searchByLocalId
}