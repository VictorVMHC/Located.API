const { response, request } = require('express');
const Products = require('../Models/Products');
const Locals = require('../Models/Locals');

const productsPost = async ( req, res = response ) => {
    try{
        const { productName, price, img, punctuation, description, tags, localId } = req.body;

        const checkLocal = Locals.findById(localId);

        if(!checkLocal){
            return res.status(404).json({
                err: 'Local not found',
            })
        }
        
        const product = new Products({productName, localId, price, img, punctuation, description, tags })
        
        await product.save();

        res.status(200).json({
            msg: 'product created successfully',
            product
        })

    }catch(err){
        res.status(500).json({
            msg: 'An error occurred while saving the product',
            err
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

const getProductsByLocalId = async (req, res = response) => {
    try {
        const localId = req.params.localId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await Products.find({ localId })
            .skip(skip)
            .limit(limit);

        const totalProducts = await Products.find({ localId }).countDocuments();

        console.log(products.length, " / ", limit);
        if (products.length === 0) {
            return res.status(404).json({
                err: 'No products were found for this page',
            });
        }

        res.status(200).json({
            msg: 'Products found',
            products,
            page,
            totalPages: Math.ceil(totalProducts / limit),
        });

    } catch (err) {
        res.status(500).json({
            err: 'An error occurred while getting the local products',
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
        const response = await Products.findByIdAndUpdate(productsIdParams, {state: false}, {new: true});
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
    getProductsByLocalId
}