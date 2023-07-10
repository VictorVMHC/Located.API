const { response, request, json } = require('express');
const Products = require('../Models/Products')

const productsPost = async ( req, res = response ) => {
    const { productName, price, img, punctuation, description, tags } = req.body;
    const products = new Products({productName, price, img, punctuation, description, tags })
    try{
        await products.save();
        res.status(200).json({
            msg: 'product created successfully',
            products
        })
    }catch{
        res.status(500).json({
            msg: 'An error occurred while saving the product',
            products
        });
    }
}


const productsGet = async (req, res = response ) => { 
    const _Id = req.params.Id;
    try{
        const products = await Products.findById(_Id);
        if(!products){
            return res.status(404).json({ error: 'product not found' }); 
        }
        res.status(200).json({
            msg: 'product found',
            products
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while finding the product',
            Id: _Id,
        });
    }
}

const productsPut = async( req, res) =>{
    const productsIdParams = req.params.Id;
    const {_Id, ...productsData} = req.body;
    try{
        const productsUpdate = await Products.findByIdAndUpdate(productsIdParams,productsData, {new: true});
        console.log(productsUpdate);
        console.log(productsData);
        if(!productsUpdate){
            return res.status(404).json({error: 'Product not found to update it'});
        }
        res.status(200).json({
            msg: 'Product updated successfully',
            products: productsUpdate
        })
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while updating the product',
            emailRequested: productId,
            dataToUpdate: data
        });
    }
}

const productsDelete = async (req=request, res=response ) => {
    const productsIdParams = req.params.Id;
    try{
        const response = await Products.findByIdAndRemove(productsIdParams, {state: false}, {new: true});
        res.status(200).json({
            msg: 'Product has been deleted',
            response
        });
    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while deleting the product',
            emailRequested: _Id,
        });
    }
}

module.exports = {
    productsPost,
    productsGet,
    productsPut,
    productsDelete,
}