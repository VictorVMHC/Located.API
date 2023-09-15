const Locals = require ('../Models/Locals');
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


module.exports={
    searchLocals,
    searchByTags
}