const { Response } = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');

const coleccionesPermitidas = [
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



const searchLocals = async (termino1 = Number, termino2 = Number, termino3 = Number, res = Response) => {
    const allLocals = await Locals.find({});
    const resultado = calculateRange(termino1, termino2, termino3);

    // Filtrar los locales dentro del rango
    const filteredLocals = allLocals.filter((local) => {
        const latitud = Math.abs(Number(local.latitude));
        const longitud = Math.abs(Number(local.longitude));

        const latitudMaximaAbs = Math.abs(resultado.latitudeMaximum);
        const latitudMinimaAbs = Math.abs(resultado.latitudeMinimum);
        const longitudMaximaAbs = Math.abs(resultado.longitudeMaxima);
        const longitudMinimaAbs = Math.abs(resultado.longitudeMinimum);
        
        console.log(latitudMaximaAbs + '-' + latitudMinimaAbs + '/' + latitud);
        console.log(longitudMaximaAbs + '-' + longitudMinimaAbs + '/' + longitud);

        return latitud >= latitudMinimaAbs && latitud <= latitudMaximaAbs && longitud >= longitudMinimaAbs && longitud <= longitudMaximaAbs;
    });

    res.json({
        results: filteredLocals
    });
}


const search = (req, res = Response ) =>{
    const {coleccion, termino, termino2, termino3} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'locals':
            searchLocals (termino, termino2, termino3, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
            break;
    }
}

module.exports={
    search
}