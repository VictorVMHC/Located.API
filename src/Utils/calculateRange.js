const calculateRange = (latitude = Number, longitude = Number, kilometers = Number) => {
    //Ley de Haversine
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

module.exports ={
    calculateRange
}