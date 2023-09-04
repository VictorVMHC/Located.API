const {response} = require('express');
const {ObjectId}= require('mongoose').Types;
const Locals = require ('../Models/Locals');

const coleccionesPermitidas = [
    'locals'
];

const searchLocals = async (termino = Number, res = response) => {
  /*  const isMongoID = ObjectId.isValid(termino);
    if (isMongoID) {
        const localId = await Locals.findById(termino);
        return res.json({
            results: localId ? [localId] : []
        });
    }
        const longitudLocal = await Locals.find({latitude: termino})
        res.json({
            results: longitudLocal
        })*/
    const allLocals = await Locals.find({});

     // Función para obtener los números antes y después del punto decimal
     const extractNumbers = (num) => {
        const numStr = String(num);
        const decimalIndex = numStr.indexOf('.');
        
        if (decimalIndex !== -1) {
            const beforeDecimal = parseInt(numStr.slice(0, decimalIndex), 10); // Obtiene los números antes del punto y los convierte a número
            const afterDecimal = parseInt(numStr.slice(decimalIndex + 1, decimalIndex + 3), 10); // Obtiene los dos números después del punto y los convierte a número
            return {
                beforeDecimal,
                afterDecimal
            };
        }
        
        return {
            beforeDecimal: parseInt(numStr, 10), // No había punto decimal, convierte a número
            afterDecimal: null
        };
    };

    // Filtra los locales y obtén los números antes y después del punto decimal y luego filtra los que son mayores que termino
    const filteredLocals = allLocals.filter((local) => {
        const { beforeDecimal, afterDecimal } = extractNumbers(local.latitude);
        const fullNumber = beforeDecimal * 100 + afterDecimal; // Combina los números antes y después del punto en un solo número
       console.log(fullNumber);
        return fullNumber >= termino;
    });

    res.json({
        results: filteredLocals
    });

}


const search = (req, res = response) =>{
    const {coleccion, termino} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'locals':
            searchLocals (termino, res)
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