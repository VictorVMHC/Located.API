const Locals = require ('../Models/Locals');
const User = require('../Models/User');
const LikedLocals = require('../Models/LikedLocals');
const {searchLatitudeAndLongitude} = require('../Utils/calculateRange');

const searchLocals = async (req, res = Response ) =>{
    const {Latitude ,Longitude, kilometers} = req.params;
    const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
    try {
        const locals = await Locals.find({
            'location.latitude': filteredLocals.latitude,           
            'location.longitude': filteredLocals.longitude,
        });
        return res.json({
            results: locals,
        });
    } catch (error) {
        console.error(error);
    }
}
    
const searchByTags = async (req, res = Response) => {
    const { Latitude, Longitude, kilometers, tags } = req.params;
    const regexTags = tags ? new RegExp(tags.split(',').join('|'), 'i') : /.*/; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);

    try {
        let localsQuery = {
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude
        };

        if (tags) {
            localsQuery.$or = [
                { tags: regexTags },
                { name: regexTags }
            ];
        }

        const locals = await Locals.find(localsQuery)
            .skip((page - 1) * limit)
            .limit(limit);

        const totalLocals = await Locals.countDocuments(localsQuery);

        if (!locals) {
            return res.status(404).json({
                err: 'No locals were found '
            });
        }

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

const searchPopularLocals = async (req, res = Response) => {
    const { Latitude, Longitude, kilometers } = req.params;

    try {
        const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
        const localesEnRango = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
        });

        const localesConLikes = await LikedLocals.aggregate([
            {
                $match: {
                    localId: { $in: localesEnRango.map(local => local._id) },
                }
            },
            {
                $group: {
                    _id: "$localId",
                    likeCount: { $sum: 1 }
                }
            },
            {
                $sort: { likeCount: -1 } 
            },
            {
                $limit: 20
            }
        ]);

        const localesPopular = await Promise.all(localesConLikes.map(async (localConLikes) => {
            const local = await Locals.findById(localConLikes._id);
            return {
                ...local,
                likeCount: localConLikes.likeCount
            };
        }));
        
console.log(localesPopular);
        return res.json({
            localesPopular,
        });

    } catch (error) {
        return res.status(500).json({
            err: 'An error occurred while searching for popular locations'
        });
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
            locals,
        });

    } catch (error) {
        res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
}


module.exports={
    searchLocals,
    searchByTags,
    searchPopularLocals,
    searchByUser
}