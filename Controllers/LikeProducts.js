const {response, request} = require('express');
const LikeProduct = require('../Models/LikeProducts');
const User = require('../Models/User');
const Products = require('../Models/Products');
const Locals = require('../Models/Locals');

const likeProductPost = async (req, res = response) =>{
    const {userId, productId} = req.body;
    try{
        const likedProduct = new LikeProduct({userId,productId});
        const user = await User.findById(userId)
        const product = await Products.findById(productId)

        if(!user || !product ){
            return res.status(404).json({
                error: "liked Product or comment not found"
            })
        }

        await likedProduct.save()
        return res.status(200).json({
            msg: 'The like was created successfully',
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the like',
            err
        });
    }
}

const likeProductGet = async (req = request, res = response) =>{
    const id = req.params.Id;
    try{
        const likedProduct = await LikeProduct.findById(id);
        if(!likedProduct){
            return res.status(404).json({ error: 'No Like Found'});
        }
        res.status(200).json({
            msg: 'like product found',
            likedProduct: likedProduct
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to find the like product'
        });
    }
}

const likeProductDelete = async (req=request, res=response ) => {
    const likeProduct_id = req.params.Id;
    try{
        const likeProductResponse = await LikeProduct.findByIdAndUpdate(likeProduct_id, {state: false}, {new: true});
        res.status(200).json({
            msg: 'Like has been deleted',
            likeProductResponse,
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while trying to delete the Like',
            emailRequested: likeProduct_id,
        });
    }
}

module.exports={
    likeProductPost,
    likeProductGet,
    likeProductDelete,
}