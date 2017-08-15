const yargs = require('yargs');
const axios = require('axios');
var geoip = require('geoip-lite');
const getIP = require('external-ip')();
 
const argv = yargs
    .options({
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var errors = (e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.')
    }else{
        console.log(e.message);
    }
};

var showTemperatureAtAddress = (encodedAddress) => {
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
    axios.get(geocodeUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address.');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        console.log(response.data.results[0].formatted_address);
        showTemperature(lat, lng);
    }).catch(errors);
};

var showTemperature = (lat, lng) => {
    var weatherUrl = `https://api.darksky.net/forecast/d109d1204214823b7784385e0050f6a4/${lat},${lng}?lang=pt&units=si`;
    axios.get(weatherUrl).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
    }).catch(errors);
};

if(argv.address){
    var encodedAddress = encodeURIComponent(argv.address);
    showTemperatureAtAddress(encodedAddress);
}else{
    getIP((err, ip) => {
        if (err) {
            throw err;
        }
        var geo = geoip.lookup(ip);
        console.log(`City: ${geo.city}, Region: ${geo.region}, ${geo.zip} - ${geo.country}`);
        showTemperature(geo.ll[0], geo.ll[1]);
    });
}