let latitude = 0; //position.coords.latitude;
let longitude = 0; //position.coords.longitude;
var hots_locations = [[43.068655, -77.438415],
		[43.094232, -77.796844],
		[43.103257, -77.464507],
		[43.114536, -77.483390],
		[43.130573, -77.478240],
		[43.146857, -77.593597],
		[43.147609, -77.628272],
		[43.154622, -77.620376],
		[43.174843, -77.629045],
		[43.165203, -77.686723],
		[43.202378, -77.642263],
		[43.182229, -77.803624],
		[43.083200, -77.639259]];
var index;
var hots_labels = ["Perinton Hots", "Chili Hots", "Fairport Hots", "ER Hots", "Penfield Hots", "Marks Texas Hots", "Jefferson Hots", "Nick Tahou Hots", "Lake Hots", "Steve T Hots", "West Ridge Hots", "Spencerport Hots", "Henrietta Hots"];

function geoFindMe() {
    var output = document.getElementById("out");


    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    } else {
      getLocation();
      //initMap();
      console.log(latitude + " " + longitude);
      //'<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
	  document.getElementById('map').style.display = "block";
	  document.getElementById('button').style.display = "none";
    }

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
	var index = nearest();
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
/*	
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer({
		map:map
	});

		  markerA = new google.maps.Marker({
				      position: uluru
				      title: "Current Location",
				      label: "A",
				      map:map
				    });

		  markerB = new google.maps.Marker({
				      position: hots_locations[index] = [0][1];
				      title: "Desitination",
				      label: "B",
				      map:map
				    });

		  Direct(directionsService, directionsDisplay, uluru, hots_locations[index]);
*/
}

function nearest() {
	var temp = [];
	hots_locations.forEach(function(loc) {
		temp.push(Math.sqrt( Math.pow(latitude - loc[0], 2) + Math.pow(longitude - loc[1], 2)));
	});
	var min = temp[0];
	temp.forEach(function(x) {
		if (x < min) { min = x; }
	});
	console.log(temp.indexOf(min));
	return temp.indexOf(min);
}
/*
function Direct(directionsService, directionsDisplay,uluru,hots_locations[index]) {
  directionsService.route({
    origin: uluru,
    destination: hots_locations[index],
    travelMode: google.maps.TravelMode.DRIVING
  }, fucntion(response, status) {
    if(status == google.maps.DirectionsStatus.OK){
      directionsDisplay.setDirections(response);
    } 
    else {
      window.alert('Directions request failed due to' + status);
    }
  });
}*/
