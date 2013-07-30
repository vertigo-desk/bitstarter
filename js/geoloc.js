var target=document.getElementById("geo_title");

function getLocation() {
    if (navigator.geolocation)
    {
	navigator.geolocation.getCurrentPosition(showPosition, errorCallback, {enableHighAccuracy : true});

    }
    else{target.innerHTML="Geolocation is not supported by this browser.";}
}

function showPosition(position) {
    document.getElementById("geo_title").innerHTML=
	"LAT: " + position.coords.latitude + 
	" | LONG: " + position.coords.longitude + 
	" | ALT: " + position.coords.altitude;
    var latlon = position.coords.latitude+","+position.coords.longitude;
    var custom_map = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=15&size=480x300&sensor=false&style=feature:road.local%7Celement:geometry%7Ccolor:0x00ff33%7Cweight:1%7Cvisibility:on&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x000000%7Cvisibility:on&style=feature:administrative%7Celement:labels%7Cweight:3.9%7Cvisibility:on%7Cinvert_lightness:true&style=feature:poi%7Cvisibility:simplified";
    var map_url="http://maps.googleapis.com/maps/api/staticmap?center="
	+latlon+"&zoom=14&size=480x300&sensor=false";
    document.getElementById("mapholder").innerHTML=
	"<img class=\"img-polaroid\" src='"+custom_map+"'>";
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
