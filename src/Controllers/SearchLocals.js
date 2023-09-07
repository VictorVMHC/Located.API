const { Response } = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');

const collectionAllowed = [
    'locals'
];

const calculateRange = (latitude = Number, longitude = Number, kilometers = Number) => {
    //Ley de Haversine
    const radioKm = kilometers;
    const radiusEarthKm = 6371.0;

    
    const latitudeReferenceRad = latitude * (Math.PI / 180);
    const lengthReferenceRad = longitude * (Math.PI / 180);

    const latitudeMaximaRad = latitudeReferenceRad + (radioKm / radiusEarthKm);
    const latitudeMinimumRad = latitudeReferenceRad - (radioKm / radiusEarthKm);

    const longitudeMaximaRad = lengthReferenceRad + (radioKm / (radiusEarthKm * Math.cos(latitudeReferenceRad)));
    const longitudeMinimumRad = lengthReferenceRad - (radioKm / (radiusEarthKm * Math.cos(latitudeReferenceRad)));

    return {
        latitudeMaximum: latitudeMaximaRad * (180 / Math.PI),
        latitudeMinimum: latitudeMinimumRad * (180 / Math.PI),
        longitudeMinimum: longitudeMaximaRad * (180 / Math.PI),
        longitudeMaxima: longitudeMinimumRad * (180 / Math.PI)
    };
}



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