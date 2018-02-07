

function initMap() {
    var antalia = {lat: 36.75649, lng: 30.80566};
    var cyprus = {lat: 34.72355, lng: 33.20068};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: antalia,
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    
    

    var marker = new google.maps.Marker({
      position: antalia,
      map: map
    });


  google.maps.event.addListener(map, 'click', function(event) {

    if (marker != undefined) {
      marker.setMap(null);
    }

    latlng = event.latLng;
    var latLat = latlng.lat();
    var latLng  = latlng.lng();

    

    marker = new google.maps.Marker({
        position: latlng,
        clickable: true,
        map: map,
        title: 'title',
        animation: google.maps.Animation.DROP,
        visible: true
    });
    
    $.ajax({
        type: "POST",
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latLat + "&lon=" + latLng +"&appid=d735182480adde5eb03094b44670d2fe",
        cache: false,
        data: {},
        success: function(lat){
            var weather = lat.main;
            var temp = weather.temp;//kelvin
            var cels = ~~(temp - 273.15);
            var wind = lat.wind;
            var windSpeed = wind.speed;
            var windDirection = ~~(wind.deg);
            var windIcon = "towards-" + windDirection + "-deg";
            document.getElementById("temp").innerHTML = cels;
            
            document.getElementById("wind").innerHTML = wind.speed + "m/s ";
            document.getElementById("winwDirection").classList.add("fa", "fa-arrow-up");
            document.getElementById("winwDirection").setAttribute("style", "transform: rotate("+windDirection+"deg)")
            console.log(cels);    
        }
    });
   

  });
}

function geocodeLatLng(geocoder, map, infowindow, latlng) {
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

