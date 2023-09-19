const Locals = require ('../Models/Locals');
const User = require('../Models/User');
const {searchLatitudeAndLongitude} = require('../Utils/calculateRange');

const searchLocals = async (req, res = Response ) =>{
    const {Latitude ,Longitude, kilometers} = req.params;
    const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
    try {
        const locals = await Locals.find({
            'location.latitude': filteredLocals.latitude,           
            'location.longitude': filteredLocals.longitude,
        });
        res.json({
            results: locals,
        });
    } catch (error) {
        console.error(error);
    }
}
    
const searchByTags = async (req, res = Response ) =>{
    const {Latitude ,Longitude, kilometers, tags} = req.params;
    const regex = new RegExp(tags, 'i');
    const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
    
    try {
        
        const locals = await Locals.find({
            'location.latitude': filteredLocals.latitude,           
            'location.longitude': filteredLocals.longitude,
            $or: [
                { tags: regex },
                { name: regex }
            ]
        });
        
        res.json({
            results: locals,
        });
    } catch (error) {
        console.error(error);
    }
}

const searchByUser = async (req, res = Response ) =>{
    
    try {
        const tokenDecoded = req.tokenDecoded
        const user  = await User.findById(tokenDecoded.id);

        const userLocals = user.locals;

        if(!userLocals){
            return res.status(404).json({
                msg: 'The user does not have locals'
            });
        }
        
        const locals = await Locals.find({
            _id: { $in: userLocals },          
        });
        
        return res.status(200).json({
            results: locals,
        });

    } catch (error) {
        res.status(500).json({ 
            error: 'Error interno del servidor' 
        });
    }
}


module.exports={
    searchLocals,
    searchByTags,
    searchByUser
}