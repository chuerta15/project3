
var maps;
function setup(){
	loadJSON("https://maps.googleapis.com/maps/api/js?key=AIzaSyC142DajwsHSKqox4-d7k8KB08YqLAcaVI&callback=initMap")
}

function gotData(data){
	//println(data;)
	maps = data;
}

var longitude;
var latitude
$(document).ready(function() {

  $('#zip-form').on('submit', function(event) {
    var query = $('#zip-code').val();
    // $('#test').append(query);
    $.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyBscMaTy7jt6fISLrMwGIejOy-1i-BqJ_g',
      function(data) {
        longitude = data.results[0].geometry.location.lng;
        latitude = data.results[0].geometry.location.lat;
        $('#test').append(' Longitude: ' + longitude + ', Latitude: ' + latitude);
      });
    event.preventDefault();
  });

});


