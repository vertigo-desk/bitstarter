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

    var custom_map = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=15&size=480x300&sensor=false&style=feature:road.local%7Celement:geometry%7Ccolor:0x00ff33%7Cweight:1%7Cvisibility:on&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x000000%7Cvisibility:on&style=feature:administrative%7Celement:labels%7Cweight:3.9%7Cvisibility:on%7Cinvert_lightness:true&style=feature:poi%7Cvisibility:simplified";
    
    var centerpos = new google.maps.LatLng(48.579400,7.7519);

    var optionsGmaps = {
	center:centerpos,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	zoom: 15,
	size:"100%"
    };
 
    var map = new google.maps.Map(document.getElementById("mapholder"), optionsGmaps);
    
    var latlng;
    
    latlng = new google.maps.LatLng(lat, lon);
 
    var marker = new google.maps.Marker({
	position: latlng,
	map: map,
	title:"V"
    });

    map.panTo(latlng);

//    Document(latlng);.getElementById("mapholder").innerHTML="<img class=\"img-polaroid\" src='"+map_url+"'>";
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
