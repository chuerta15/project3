

$(document).ready(function() {
  var initLat = 41.8403395;
  var initLong = -87.627092;
  var map = new GMaps({
    el: '#map',
    lat: initLat,
    lng: initLong,
  })
  map.addMarker({
    lat: initLat,
    lng: initLong,
    title: 'your place',
    click: function(e) {
      alert('you clicked');
    }
  })

$('#zip-form').on('submit', function(event) {
  var query = $('#zip-code').val();
    $('#test').append(query);
    $.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyAz2_Ve_tK4VvHl-F0nD1oKACoQdiw_MZA',
      function(data) {
        $('#test').append(data.results[0]);
        var longitude = data.results[0].geometry.location.lng;
        var latitude = data.results[0].geometry.location.lat;
        $('#test').append(' Longitude: ' + longitude + ', Latitude: ' + latitude);
        map = new GMaps({
          el: '#map',
          lat: latitude,
          lng: longitude,
        })
        map.addMarker({
          lat: latitude,
          lng: longitude,
          title: 'your place',
          click: function(e) {
            alert('you clicked');
          }
        })
      });



    event.preventDefault();
  });

});


