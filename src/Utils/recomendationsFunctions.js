const LikeLocal = require('../Models/LikedLocals');

const getUserSimilarity = async (likedLocalIds, allUsers) => {
    const similarUsers = [];

    for (const user of allUsers) {
        const userLikes = await LikeLocal.find({ userId: user._id});
        const userLikedLocals = new Set(userLikes.map(like => like.localId.toString()));
        const userSimilarity = calculateJaccardSimilarity(userLikedLocals, new Set(likedLocalIds));
        similarUsers.push({ user, similarity: userSimilarity });
    }

    return similarUsers;
}

const calculateJaccardSimilarity = (setA, setB) => {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
};

const generateRecommendations = async (similarUsers, likedLocalIds) => {
    const recommendationsMap = new Map();

    for (const similarUser of similarUsers) {
        if (similarUser.similarity > 0) {
            const userLikes = await LikeLocal.find({ userId: similarUser.user._id });
            const likedLocalIdsByUser = new Set(userLikes.map(like => like.localId.toString()));
            const newLikes = [...likedLocalIdsByUser].filter(localId => !likedLocalIds.includes(localId));

            for (const localId of newLikes) {
                const recommendationScore = calculateRecommendationScore(similarUsers, likedLocalIdsByUser, localId);

                if (!recommendationsMap.has(localId) || recommendationScore > recommendationsMap.get(localId).score) {
                    recommendationsMap.set(localId, { localId, score: recommendationScore });
                }
            }
        }
    }
    const recommendations = [...recommendationsMap.values()];
    return recommendations;
}

const calculateRecommendationScore = (similarUsers, likedLocalIdsByUser, localId) => {
    let recommendationScore = 0;
    for (const user of similarUsers) {
        if (likedLocalIdsByUser.has(localId)) {
            recommendationScore += user.similarity;
        }
    }
    return recommendationScore;
}




module.exports = {
    calculateJaccardSimilarity,
    calculateRecommendationScore,
    generateRecommendations,
    getUserSimilarity
}