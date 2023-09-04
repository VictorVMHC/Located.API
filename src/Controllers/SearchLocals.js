const { Response } = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');

const coleccionesPermitidas = [
    'locals'
];

const calculateRange = (termino1 = Number, termino2 = Number, termino3 = Number) => {
    const radioKm = termino3;
    const radioTierraKm = 6371.0;
    const latitudReferenciaRad = termino1 * (Math.PI / 180);
    const longitudReferenciaRad = termino2 * (Math.PI / 180);

    const latitudMaximaRad = latitudReferenciaRad + (radioKm / radioTierraKm);
    const latitudMinimaRad = latitudReferenciaRad - (radioKm / radioTierraKm);

    const longitudMaximaRad = longitudReferenciaRad + (radioKm / (radioTierraKm * Math.cos(latitudReferenciaRad)));
    const longitudMinimaRad = longitudReferenciaRad - (radioKm / (radioTierraKm * Math.cos(latitudReferenciaRad)));

    return {
        latitudMaxima: latitudMaximaRad * (180 / Math.PI),
        latitudMinima: latitudMinimaRad * (180 / Math.PI),
        longitudMinima: longitudMaximaRad * (180 / Math.PI),
        longitudMaxima: longitudMinimaRad * (180 / Math.PI)
    };
}



const searchLocals = async (termino1 = Number, termino2 = Number, termino3 = Number, res = Response) => {
    // Obtener todos los locales de la base de datos
    const allLocals = await Locals.find({});
    
    // Calcular el rango de latitud y longitud
    const resultado = calculateRange(termino1, termino2, termino3);

    // Filtrar los locales dentro del rango
    const filteredLocals = allLocals.filter((local) => {
        const latitud = Math.abs(Number(local.latitude));
        const longitud = Math.abs(Number(local.longitude));

        const latitudMaximaAbs = Math.abs(resultado.latitudMaxima);
        const latitudMinimaAbs = Math.abs(resultado.latitudMinima);
        const longitudMaximaAbs = Math.abs(resultado.longitudMaxima);
        const longitudMinimaAbs = Math.abs(resultado.longitudMinima);
        
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