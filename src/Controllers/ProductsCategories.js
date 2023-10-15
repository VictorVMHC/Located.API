const { response, request } = require('express');
const ProductsCategories = require('../Models/ProductsCategories');

const productsCategoriesPost = async( req, res = response ) => {
    const {category} = req.body;
    try{
        const categoryResponse = new ProductsCategories({category})
        await categoryResponse.save()
        
        return res.status(200).json({
            msg: 'Product category successfully added',
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the Product category',
            err
        });
    }
}

const productsCategoriesGet = async (req = request,  res = response) =>{
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    try{
        const totalCategories = await ProductsCategories.countDocuments();
        const totalPages = Math.ceil(totalCategories / perPage);

        const categories = await ProductsCategories.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        res.status(200).json({
            current_page: page,
            total_pages: totalPages,
            business_options: categories.map(type => type.category),
        })

    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to get the Product categories'
        });
    }
}

module.exports = {
    productsCategoriesPost,
    productsCategoriesGet    
}