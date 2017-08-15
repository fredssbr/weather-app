var request = require('request');

var geocode = (address) => {
    var encodedAddress = encodeURIComponent(address);
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Google servers.');
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address.');
            }else if(body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocode('18135510').then((location) => {
    console.log(JSON.stringify(location, undefined, 4));
}, (errorMessage) => {
    console.log(errorMessage);
});