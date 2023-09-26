const {response, request} = require('express');
const LikedLocals = require('../Models/LikedLocals');
const Locals = require ('../Models/Locals');
const {searchLatitudeAndLongitude} = require('../Utils/calculateRange');

const getPopularLocals = async (req = request, res = response) =>{
    const {Latitude ,Longitude, kilometers} = req.params;
    const filteredLocals = searchLatitudeAndLongitude(Latitude, Longitude, kilometers);
    try {
        const popularLocals = await LikedLocals.aggregate([
            {
                $group:{
                    _id: "$localId",
                    likeCount: {$sum: 1}
                }
            },
            {
                $sort: { likeCount: -1 }
            },
            {
                $limit: 20
            }
        ]);

        const popularLocalIds = popularLocals.map(local => local._id);

        const locals = await Locals.find({
            'location.latitude': filteredLocals.latitude,
            'location.longitude': filteredLocals.longitude,
            _id: { $in: popularLocalIds }
        });

        res.json({
            results: locals
        });
    } catch (error) {
        res.status(500).json({
            msg: 'An error occurred while trying to find popular locals',
        });
    }
}

module.exports={
    getPopularLocals
}