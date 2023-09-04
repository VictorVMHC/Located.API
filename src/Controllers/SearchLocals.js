const { Response } = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');

const collectionAllowed = [
    'locals'
];

const calculateRange = (latitude = Number, longitude = Number, kilometers = Number) => {
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
    const allLocals = await Locals.find({});
    const resultCalculateRange = calculateRange(Latitude, Longitude, kilometers);

    const filteredLocals = allLocals.filter((local) => {
        const latitude = Math.abs(Number(local.latitude));
        const longitude = Math.abs(Number(local.longitude));

        const latitudeMaxiAbs = Math.abs(resultCalculateRange.latitudeMaximum);
        const latitudeMinimumAbs = Math.abs(resultCalculateRange.latitudeMinimum);
        const longitudeMaximaAbs = Math.abs(resultCalculateRange.longitudeMaxima);
        const longitudeMinimumAbs = Math.abs(resultCalculateRange.longitudeMinimum);

        return latitude >= latitudeMinimumAbs && latitude <= latitudeMaxiAbs && longitude >= longitudeMinimumAbs && longitude <= longitudeMaximaAbs;
    });

    const startIndex = (1 - 1) * 10;
    const endIndex = 1 * 10;

    const paginatedResults = filteredLocals.slice(startIndex, endIndex);

    res.json({
        results: paginatedResults,
        currentPage: 1,
        totalPages: Math.ceil(filteredLocals.length / 10)
    });
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