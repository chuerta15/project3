

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
  });

  $('#zip-form').on('submit', function(event) {
    var query = $('#zip-code').val();
    console.log(query);
    $('#zip').empty();
    $('#zip').append(query);
    $.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + query +
        '&key=AIzaSyBscMaTy7jt6fISLrMwGIejOy-1i-BqJ_g',
      function(data) {
        // load the initial zip code
        var status = data.status;
        switch(status) {
          case "OK":
            console.log("Successful query");
            break;
          case "ZERO_RESULTS":
            console.log("Zip code not found");
            var str = (' Sorry, I could not find that zip code').fontcolor("red");
            $('#zip').append(str);
            break;
          default:
            console.log('default');
            $('#zip').append(' Sorry, something really weird happened.  We will be investigating this soon');
            break;
        }
        console.log(status);
        var longitude = data.results[0].geometry.location.lng;
        var latitude = data.results[0].geometry.location.lat;
        var city = data.results[0].address_components[1].short_name;
        console.log(city);
        $('#zip').append(': Longitude: ' + longitude + ', Latitude: ' + latitude);
        map = new GMaps({
          el: '#map',
          lat: latitude,
          lng: longitude,
        })
        map.addMarker({
          lat: latitude,
          lng: longitude,
          title: 'your spot',
          click: function(e) {
            alert('you clicked');
          }
        })
        addMarkers(map, query);
      });
    event.preventDefault();
  });



  function addMarkers(map, zip)
  {
    console.log('addMarkers');
    console.log(zip);
    accessData();


    // function someFunction(result) {
    //   var shelters = result.petfinder.shelters.shelter;
    //   console.log(shelters);

    //   var localShelters = [];
    //   for(var i = 0;  i < shelters.length; i++) {
    //     var shelter = new Object();
    //     shelter.name = shelters[i].name;
    //     shelter.city = shelters[i].city;
    //     shelter.latitude = shelters[i].latitude;
    //     shelter.longitude = shelters[i].longitude;
    //     shelter.zip = shelters[i].zip;
    //     shelter.phone = shelters[i].phone;
    //     localShelters.push(shelter);
    //     console.log(shelter.latitude, shelter.longitude);
    //   }
    // };

    function accessData ()  {
      var key = 'ca77abb4e1f8c1cb6d536dfcdf9f45da';
      var secret = '68426d0a9aa189d3d8fddb057a27b23d';
    // var md5 = MD5(secret+key);  //needed only for some queries leaving this here for now as I will need it for other queries

    // get authorization token
    var url = 'https://api.petfinder.com/';
    var searchItem = 'shelter.find'
    var apiString = 'https://api.petfinder.com/shelter.find?format=json&key=' + key  +
    '&location=' + zip + '&callback=?';

    // var status;
    // var petData;
    console.log(apiString);

    $.ajax({
      url: apiString,
      dataType: 'jsonp',
      error: function (error) {
        console.log(error);
        var str = ' A data access error occurred.  Please try again later';
        $('#error').append(str.fontcolor("red"));
      },
      success: function(data){

      var shelters = data.petfinder.shelters.shelter;
      // console.log(shelters);

      var localShelters = [];
      for(var i = 0;  i < shelters.length; i++) {
        map.addMarker({
          lat: shelters[i].latitude.$t,
          lng: shelters[i].longitude.$t,
          title: shelters[i].name.$t,
          click: function(e) {
            alert('you clicked');
          }
        })

        var shelter = new Object();
        shelter.name = shelters[i].name.$t;
        shelter.city = shelters[i].city.$t;
        shelter.latitude = shelters[i].latitude.$t;
        shelter.longitude = shelters[i].longitude.$t;
        shelter.zip = shelters[i].zip.$t;
        shelter.phone = shelters[i].phone.$t;
        localShelters.push(shelter).$t;
        // console.log(shelter.latitude.$t, shelter.longitude.$t);
        };
      }
    })
  };
};

});  //document.ready end




