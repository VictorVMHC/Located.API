const { Response } = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');
const {calculateRange, searchLatitudeandLongitud} = require('../Utils/calculateRange');


const collectionAllowed = [
    'locals',
    'closetome'
];

const searchLocals = async (Latitude = Number, Longitude = Number, kilometers = Number, res = Response) => {
    const filteredLocals = searchLatitudeandLongitud(Latitude, Longitude, kilometers);
    try {
        const locals = await Locals.find(filteredLocals);
        res.json({
            results: locals,
        });
    } catch (error) {
        console.error(error);
    }
}

const  searchFoodView = async (Latitude = Number, Longitude = Number, kilometers = Number, termino = String, res = Response) => {
    const regex = new RegExp(termino, 'i');
    const localsQuery = searchLatitudeandLongitud(Latitude, Longitude, kilometers);
    
    const locals = await Locals.find({
        $or: [
            { tags: regex },
            { name: regex }
        ],
        ...localsQuery 
    });

    res.json({
        results: locals
    });

}


const search = (req, res = Response ) =>{
    const {collection, var1 ,var2, var3, var4} = req.params;
    if(!collectionAllowed.includes(collection)){
        return res.status(400).json({
            msg: `The allowed collections are: ${collectionAllowed}`
        })
    }

    switch (collection) {
        case 'locals':
            searchLocals(var1, var2, var3, res);
            break;

        case 'closetome':
            searchFoodView(var1 ,var2 ,var3 ,var4 ,res)
            break;
    
        default:
            res.status(500).json({
                msg: 'You forgot to do this search'
            })
            break;
    }
}

module.exports={
    search
}