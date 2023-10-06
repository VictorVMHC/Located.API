const Locals = require ('../Models/Locals');
const User = require('../Models/User');
const LikeLocal = require('../Models/LikedLocals');
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
        const localsInRange = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
        });

        const likedLocalsSorted = await LikedLocals.aggregate([
            {
                $match: {
                    localId: { $in: localsInRange.map(local => local._id) },
                }
            },
            {
                $group: {
                    _id: "$localId",
                    likeCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "locals", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "localData"
                }
            },
            {
                $unwind: "$localData"
            },
            {
                $sort: { likeCount: -1 } 
            },
            {
                $limit: 20
            },
            {
                $project: {
                    _id: 0,
                    likeCount: 1,
                    localData: 1
                }
            }
        ]);
        console.log(likedLocalsSorted);
        return res.status(200).json({
            results: likedLocalsSorted,
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

const searchLocalsAndLikes = async (req, res = Response) => {
    const { Latitude, Longitude, kilometers} = req.params;
    try{
        const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
        const localsInRange = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
        });

        const localsWithLikes = [];
        for (const local of localsInRange) {
            const localLikes = await LikeLocal.countDocuments({localId: local._id })
            const resultLikes = await LikeLocal.findOne({ userId: local._id, localId: local.userId }).select('_id');
            const liked = resultLikes ? true : false;
            localsWithLikes.push({
                ...local.toObject(),
                localLikes,
                liked
            });
        }
    
        return res.status(200).json({
            results: localsWithLikes,
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports={
    searchLocals,
    searchByTags,
    searchPopularLocals,
    searchByUser,
    searchLocalsAndLikes
}