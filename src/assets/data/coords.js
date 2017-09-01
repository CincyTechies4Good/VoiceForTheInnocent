/*
  this is meant to be manually run from a command line
  need to set environment variable GOOGLE_MAPS_API_KEY to valid api key
  then run:
    node data/coords.js
*/


const json = require('json-file');
const GoogleMapsAPI = require('googlemaps')

function geocode(site) {
  var publicConfig = {
    'key': process.env.GOOGLE_MAPS_API_KEY,
    'stagger_time':       1000, // for elevationPath
    'encode_polylines':   false,
    'secure':             true, // use https
    // 'proxy':              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
  };
  var gmAPI = new GoogleMapsAPI(publicConfig);

  // geocode API
  var geocodeParams = {
    "address":    site.name + ' ' + site.city + ', ' + site.state,
    "language":   "en",
  };

  gmAPI.geocode(geocodeParams, function(err, result){
    // console.log('.......result......', result);
    if(result && result.results && result.results.length) {
      console.log('site: ' + geocodeParams.address, result.results[0].geometry.location);
      // array.push(result.results[0].geometry.location)
    }
  });
}

let file = json.read('./data/crisis-centers.json')
console.log("read in", file.data.length, "sites")
file.data.forEach(a => {
   geocode(a);
})
