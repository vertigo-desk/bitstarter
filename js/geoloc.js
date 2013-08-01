function getLocation() {
    if (navigator.geolocation)
    {
	var options = {timeout:60000, maximumAge:10000, enableHighAccuracy:true};	
	navigator.geolocation.watchPosition(showPosition, errorCallback, options);

    }
    else
    {
	target.innerHTML="Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var acc = position.coords.accuracy;
    var speed = position.coords.speed;
    if (speed == null) {speed = "n/a";} else {speed = speed *3,6}
    var altitude = position.coords.altitude;
    if (altitude == null) {altitude = "n/a";}
    var altacc = position.coords.altitudeAccuracy;
    if (altacc == null) {altacc = "n/a";}
    
    document.getElementById("geoData").innerHTML=
	"|||| LAT - " + lat + 
	"<br>|| LONG - " + lon + 
	"<br>|||| ACC - " + acc + " (m)" + 
	"<br>|| SPEED -  " + speed +  " (km/h)" + 
	"<br>|||| ALT - " + altitude +  " (m)" + 
	"<br>| ALTACC - " + altacc + " (m)";

    var latlon = position.coords.latitude+","+position.coords.longitude;
    
    var styles = [
  {
    "stylers": [
      { "hue": "#ffbb00" }
    ]
  },{
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      { "color": "#6889ac" },
      { "lightness": 40 }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      { "color": "#5d80a3" }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "color": "#486784" }
    ]
  },{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#dd5a00" },
      { "lightness": 31 }
    ]
  },{
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      { "weight": 1 },
      { "color": "#003264" }
    ]
  },{
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      { "weight": 1 },
      { "color": "#003264" }
    ]
  },{
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      { "weight": 0.5 },
      { "color": "#003c76" }
    ]
  },{
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#e9e5c2" }
    ]
  }
]

    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
    
    var optionsGmaps = {
	zoom: 15,
	size:"100%",
	mapTypeControlOptions: {
	    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	}
    };


 
    var map = new google.maps.Map(document.getElementById("mapholder"), optionsGmaps);
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var latlng;
    latlng = new google.maps.LatLng(lat, lon);
 
    var marker = new google.maps.Marker({
	position: latlng,
	map: map,
	title:"V"
    });

    map.panTo(latlng);

}

function errorCallback(error){
  switch(error.code){
    case error.PERMISSION_DENIED:
      alert("unauthorized");
      break;      
    case error.POSITION_UNAVAILABLE:
      alert("impossible to locate");
      break;
    case error.TIMEOUT:
      alert("timeout");
      break;
    }
}

getLocation();
