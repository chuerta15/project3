

$(document).ready(function() {
  var initLat = 41.8403395;
  var initLong = -87.627072;
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
    console.log(query);
    $('#zip').empty();
    $('#zip').append(query);
    $.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + query + '&key=AIzaSyBscMaTy7jt6fISLrMwGIejOy-1i-BqJ_g',
      function(data) {
        // $('#zip').append('Position: ' + data.results[0]);
        var longitude = data.results[0].geometry.location.lng;
        var latitude = data.results[0].geometry.location.lat;
        $('#zip').append(': Longitude: ' + longitude + ', Latitude: ' + latitude);
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


