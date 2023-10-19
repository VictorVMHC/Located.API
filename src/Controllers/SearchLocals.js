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
        return res.status(500).json({ 
            error: 'Internal Server Error' 
        });
    }
}
    
const searchByTags = async (req, res = Response) => {
    const { Latitude, Longitude, kilometers, tags} = req.params;
    const tokenDecoded = req.tokenDecoded;
    const regexTags = tags ? new RegExp(tags.split(',').join('|'), 'i') : /.*/; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
        const localsInRange = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
        });

        const localsWithLikes = [];
        for (const local of localsInRange) {
            const localLikes = await LikeLocal.countDocuments({localId: local._id })
            const resultLikes = await LikeLocal.findOne({ userId: tokenDecoded.id, localId: local._id }).select('_id');
            const liked = resultLikes ? true : false;
            localsWithLikes.push({
                ...local.toObject(),
                localLikes,
                liked
            });
        }

        const filteredLocalsByTags = localsWithLikes.filter(local => local.tags.some(tag => regexTags.test(tag)));

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedLocals = filteredLocalsByTags.slice(startIndex, endIndex);

        const totalLocals = filteredLocalsByTags.length;
        const totalPages = Math.ceil(totalLocals / limit);

        return res.status(200).json({
            locals: paginatedLocals,
            page,
            totalPages
        });

    } catch (error) {
        return res.status(500).json({
            err: 'An error occurred while getting the locals'
        })
    }
}

const searchPopularLocals = async (req, res = Response) => {
    const { Latitude, Longitude, kilometers } = req.params;
    const tokenDecoded = req.tokenDecoded;

    try {
        const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
        const localsInRange = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
        });
        const localsWithLikes = [];
        for (const local of localsInRange) {
            const localLikes = await LikeLocal.countDocuments({localId: local._id })
            const resultLikes = await LikeLocal.findOne({ userId: tokenDecoded.id, localId: local._id }).select('_id');
            const liked = resultLikes ? true : false;
            if(localLikes > 0){
                localsWithLikes.push({
                    ...local.toObject(),
                    localLikes,
                    liked
                });
            }
        }

        localsWithLikes.sort((a, b) => b.localLikes - a.localLikes);
        const top20Locals = localsWithLikes.slice(0, 20);
        return res.status(200).json({
            results: top20Locals,
        });
    } catch (error) {
        return res.status(500).json({ 
            error: 'Internal Server Error' 
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
    const tokenDecoded = req.tokenDecoded;
    try{
        const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
        const localsInRange = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
        });

        const localsWithLikes = [];
        for (const local of localsInRange) {
            const localLikes = await LikeLocal.countDocuments({localId: local._id })
            const resultLikes = await LikeLocal.findOne({ userId: tokenDecoded.id, localId: local._id }).select('_id');
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
