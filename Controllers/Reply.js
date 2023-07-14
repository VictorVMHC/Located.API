const { response, request, json } = require('express');
const Reply = require('../Models/Reply')
const User = require('../Models/User')
const Comment = require('../Models/Comment')

const replyPost = async(req, res = response)=>{
    const {commentId, userId, replied} = req.body;
    try{
        const reply = new Reply({commentId, userId, replied})
        const comment = await Comment.findById(req.params._id)
        const user = await User.findById(req.params._id2)
        reply.commentId = comment
        reply.userId = user
        await reply.save()
        comment.replies.push(reply)
        user.replies.push(reply)
        await comment.save();
        await user.save();
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

module.exports = {
    replyPost
}