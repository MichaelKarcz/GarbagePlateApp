let latitude = 43.155863; //position.coords.latitude;
let longitude = -77.608505; //position.coords.longitude;
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
var start = new google.maps.LatLng(latitude, longitude);
var end = start;
var hots_labels = ["Perinton Hots", "Chili Hots", "Fairport Hots", "ER Hots", "Penfield Hots", "Marks Texas Hots", "Jefferson Hots", "Nick Tahou Hots", "Lake Hots", "Steve T Hots", "West Ridge Hots", "Spencerport Hots", "Henrietta Hots"];

function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    } else {
      getLocation();
      console.log(latitude + " " + longitude);
	  document.getElementById('map').style.display = "block";
	  document.getElementById('button').style.display = "none";
    }

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
	start = new google.maps.LatLng(latitude, longitude);
	var index = nearest();
	end = new google.maps.LatLng(hots_locations[index][0], hots_locations[index][1]);
	//end = new google.maps.LatLng(43.182229, -77.803624);
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

function initMap() {
	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
       zoom: 10,
       center: {lat:latitude, lng: longitude},
		styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
   directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
   }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
   });
}
