var axios = require('axios');
var BGG_API = "http://bgg-json.azurewebsites.net/";
var itemLookupEndpoint = "thing/";

var bggLookup = function (id, callback) {
  var url = BGG_API + itemLookupEndpoint + id;
  console.log(url);
  axios.get(url)
    .then(function (response) {
      callback(null, response);
    })
    .catch(function (response) {
      callback(response);
    });
};

module.exports = bggLookup;