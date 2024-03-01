const calculateRange = (latitude = Number, longitude = Number, kilometers = Number) => {
    const radioKm = kilometers;
    const radiusEarthKm = 6371.0;

    const latitudeReferenceRad = latitude * (Math.PI / 180);
    const lengthReferenceRad = longitude * (Math.PI / 180);

    const latitudeMaximaRad = latitudeReferenceRad + (radioKm / radiusEarthKm);
    const latitudeMinimumRad = latitudeReferenceRad - (radioKm / radiusEarthKm);

    const longitudeMaximaRad = lengthReferenceRad + (radioKm / (radiusEarthKm * Math.cos(latitudeReferenceRad)));
    const longitudeMinimumRad = lengthReferenceRad - (radioKm / (radiusEarthKm * Math.cos(latitudeReferenceRad)));

    return {
        latitudeMaximum: latitudeMaximaRad * (180 / Math.PI),
        latitudeMinimum: latitudeMinimumRad * (180 / Math.PI),
        longitudeMinimum: longitudeMaximaRad * (180 / Math.PI),
        longitudeMaxima: longitudeMinimumRad * (180 / Math.PI)
    };
}

const searchLatitudeAndLongitude = (Latitude = Number, Longitude = Number, kilometers = Number) => {
    const resultCalculateRange = calculateRange(Latitude, Longitude, kilometers);
    return {
        latitude: {
            $gte: resultCalculateRange.latitudeMinimum,
            $lte: resultCalculateRange.latitudeMaximum
        },
        longitude: {
            $gte: resultCalculateRange.longitudeMaxima,
            $lte: resultCalculateRange.longitudeMinimum
        }
    };
};

module.exports ={
    calculateRange,
    searchLatitudeAndLongitude
}