let latitude = 0; //position.coords.latitude;
let longitude = 0; //position.coords.longitude;

function geoFindMe() {
    var output = document.getElementById("out");


    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    } else {
      getLocation();
      initMap();
      console.log(latitude + " " + longitude);
      //'<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    }

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude + " *** " + longitude);
    initMap();
  }

  function error() {
      output.innerHTML = "Unable to retrieve your location";
  }

  //output.innerHTML = "<p>Locating…</p>";

  function getLocation() {

    navigator.geolocation.getCurrentPosition(success, error);
    
  }
}

function initMap() {

    var uluru = {
        lat: latitude,
        lng: longitude
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}