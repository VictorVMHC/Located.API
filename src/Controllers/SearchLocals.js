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
    
const searchByTags = async (req, res = Response) => {
    const { Latitude, Longitude, kilometers, tags} = req.params;
    const regexTags = new RegExp(tags.split(',').join('|'), 'i'); 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);

    try {
        const locals = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
            $or: [
                { tags: regexTags }, 
                { name: regexTags }  
            ]
        })
        .skip((page - 1) * limit) 
        .limit(limit);

        const totalLocals =  await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
            $or: [
                { tags: regexTags }, 
                { name: regexTags }  
            ]
        }).countDocuments();

        if(!locals){
            return res.status(404).json({
                err: 'No locals were found '
            });
        }

        console.log(totalLocals, limit);
        return res.status(200).json({
            locals,
            page,
            totalPages: Math.ceil(totalLocals / limit)
        });

    } catch (error) {
        return res.status(500).json({
            err: 'An error occurred while getting the locals'
        })
    }
}


module.exports={
    searchLocals,
    searchByTags
}