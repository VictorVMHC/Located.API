const { response, request } = require('express');
const   Comment = require('../Models/Comment')
const User = require('../Models/User')
const Local = require('../Models/Locals');
const BusinessTypes = require('../Models/BusinessTypes');

const businessTypesPost = async( req, res = response ) => {
    const {businessType} = req.body;
    try{
        const businessTypes = new BusinessTypes({businessType});
        await businessTypes.save()
        
        return res.status(200).json({
            msg: 'Business type created successfully',
        });

    }catch(err){
        return res.status(500).json({
            msg: 'An error occurred while saving the business Types',
            err
        });
    }
}

const businessTypesGet = async (req = request,  res = response) =>{
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    try{
        const totalBusinessTypes = await BusinessTypes.countDocuments();
        const totalPages = Math.ceil(totalBusinessTypes / perPage);

        const businessTypes = await BusinessTypes.find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        res.status(200).json({
            current_page: page,
            total_pages: totalPages,
            business_options: businessTypes.map(type => type.businessType),
        })
    }catch(err){
        res.status(500).json({
            msg: ' An error ocurred while trying to get the business types'
        });
    }
}

module.exports = {
    businessTypesGet,
    businessTypesPost    
}