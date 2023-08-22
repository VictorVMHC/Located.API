const { response, request } = require('express');
const Categories = require('../Models/Categories');

const categoriesPost = async( req, res = response ) => {
    const {category} = req.body;
    try{
        const categoryResponse = new Categories({category})
        await categoryResponse.save()
        
        return res.status(200).json({
            msg: 'Category successfully added',
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the category',
            err
        });
    }
}

const categoriesGet = async (req = request,  res = response) =>{
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    try{
        const totalCategories = await Categories.countDocuments();
        const totalPages = Math.ceil(totalCategories / perPage);

        const categories = await Categories.find()
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
            msg: ' An error ocurred while trying to get the categories'
        });
    }
}

module.exports = {
    categoriesPost,
    categoriesGet    
}