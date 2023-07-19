const {response, request} = require('express');
const LikeProduct = require('../Models/LikeProducts');
const User = require('../Models/User');
const Products = require('../Models/Products');
const Locals = require('../Models/Locals');

const likeProductPost = async (req, res = response) =>{
    const {userId, productId} = req.body;
    try{
        const likeproduct = new LikeProduct({userId,productId});
        const user = await User.findById(userId)
        const product = await Products.findById(productId)
        likeproduct.userId = user
        likeproduct.productId = product
        await likeproduct.save()
        return res.status(200).json({
            msg: 'The like was created succesfully',
            product,
        });
    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the like',
            err
        });
    }
}

const likeProductGet = async (req = request, res = response) =>{
    const _ID = req.params.Id;
    try{
        const likeproduct = await LikeProduct.findById(_ID);
        if(!likeproduct){
            return res.status(404).json({ error: 'No Like Found'});
        }
        res.status(200).json({
            msg: 'like product found',
            likeproduct
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
            msg: 'An error occurred while traying to delete the Like',
            emailRequested: likeProduct_id,
        });
    }
}

module.exports={
    likeProductPost,
    likeProductGet,
    likeProductDelete,
}