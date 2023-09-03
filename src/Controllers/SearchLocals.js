const {response} = require('express');

const searchLocals = (req, res = response) =>{
   // const {coleccion, termino} = req.params;
    res.json({
        msg: 'Buscar....'
    })
}

module.exports={
    searchLocals
}