let latitude = 43.155863; //position.coords.latitude;
let longitude = -77.608505; //position.coords.longitude;
var hots_locations = [[43.068057, -77.438674], // 0
		[43.093555, -77.797576], // 1
		[43.102459, -77.465241], // 2
		[43.114087, -77.484099], // 3
		[43.129964, -77.478287], // 4
		[43.146561, -77.594072], // 5
		[43.146986, -77.628801], // 6
		[43.153882, -77.621239], // 7
		[43.174666, -77.629222], // 8
		[43.164968, -77.686938], // 9
		[43.202162, -77.642374], // 10
		[43.182082, -77.803658], // 11
		[43.082645, -77.639859], // 12
    [43.147791, -77.709796], // 13
    [43.241260, -77.695929], // 14
    [43.215278, -77.938466]]; // 15
var index;
var start = new google.maps.LatLng(latitude, longitude);
var end = start;
var hots_labels = ["Perinton Hots", // 0
                   "Chili Hots", // 1
                   "Fairport Hots", // 2
                   "ER Hots", // 3
                   "Penfield Hots", // 4
                   "Marks Texas Hots", // 5
                   "Jefferson Hots", // 6
                   "Nick Tahou Hots", // 7
                   "Lake Hots", // 8
                   "Steve T Hots", // 9
                   "West Ridge Hots", // 10
                   "Spencerport Hots", // 11
                   "Henrietta Hots", // 12
                   "Wimpy's Burger Basket (Gates)", // 13
                   "Wimpy's Burger Basket (Greece)", // 14
                   "Jimmy Z's Texas Hots"]; // 15

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
