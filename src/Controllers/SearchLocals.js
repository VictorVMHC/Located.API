const { Response } = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');
const {calculateRange} = require('../Utils/calculateRange');


const collectionAllowed = [
    'locals'
];

const searchLocals = async (Latitude = Number, Longitude = Number, kilometers = Number, res = Response) => {
    const resultCalculateRange = calculateRange(Latitude, Longitude, kilometers);

    (async () => {
        try {
            const filteredLocals = await Locals.find({
                latitude: {
                    $gte: resultCalculateRange.latitudeMinimum,
                    $lte: resultCalculateRange.latitudeMaximum
                },
                longitude: {
                    $gte: resultCalculateRange.longitudeMaxima,
                    $lte: resultCalculateRange.longitudeMinimum
                }
            });
            res.json({
                results: filteredLocals,
            });
        } catch (error) {
            console.error(error);
        }
    })();
}


const search = (req, res = Response ) =>{
    const {collection, var1 ,var2, var3} = req.params;
    if(!collectionAllowed.includes(collection)){
        return res.status(400).json({
            msg: `The allowed collections are: ${collectionAllowed}`
        })
    }

    switch (collection) {
        case 'locals':
            searchLocals(var1, var2, var3, res);
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