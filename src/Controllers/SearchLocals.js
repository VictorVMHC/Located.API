const { Response } = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');

const coleccionesPermitidas = [
    'locals'
];



const searchLocals = async (termino = Number, termino2 = Number, res = Response) => {
    const allLocals = await Locals.find({});
    const latitud = Math.abs(Number(String(termino).replace(/[-.]/g, '')));
    const longitud = Math.abs(Number(String(termino2).replace(/[-.]/g, '')));

    const filteredLocals = allLocals.filter((local) => {
        const Latitud = Math.abs(Number(String(local.latitude).replace(/[-.]/g, '')));
        const Longitud = Math.abs(Number(String(local.longitude).replace(/[-.]/g, '')));

        return Latitud >= latitud && Longitud >= longitud;
    });

    res.json({
        results: filteredLocals
    });
}


const search = (req, res = Response ) =>{
    const {coleccion, termino, termino2} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'locals':
            searchLocals (termino, termino2, res)
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