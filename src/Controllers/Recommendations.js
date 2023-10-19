const { response, request } = require('express');
const User = require('../Models/User');
const LikeLocal = require('../Models/LikedLocals');
const { generateRecommendations, getUserSimilarity } = require('../Utils/recomendationsFunctions');
const Locals = require('../Models/Locals');

const getRecommendations = async (req, res) => {
    try {
        const tokenDecoded = req.tokenDecoded;
        const userId = tokenDecoded.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const likedLocals = await LikeLocal.find({ userId });
        const likedLocalIds = likedLocals.map(like => like.localId.toString());

        const allUsers = await User.find({ _id: { $ne: userId } }).limit(50);
        
        const similarUsers = await getUserSimilarity(likedLocalIds, allUsers);

        const recommendations = await generateRecommendations(similarUsers, likedLocalIds);
        const localPromises = recommendations.map(item => Locals.findById(item.localId));

        const localResults = await Promise.all(localPromises);
        const localsRecommended = localResults.filter(local => local !== null);

        return res.status(200).json({
            msg: 'Recommendations created successfully',
            localsRecommended
        });

    } catch (err) {
        return res.status(500).json({
            msg: 'An error occurred while trying to get the recommendations',
            err
        });
    }
}


module.exports = {
    getRecommendations,
}