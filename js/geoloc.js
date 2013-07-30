/*
navigator.geolocation.getCurrentPosition(function(position) {
  var infopos = "Position :\n";
  infopos += "Latitude : "+position.coords.latitude +"\n";
  infopos += "Longitude: "+position.coords.longitude+"\n";
  infopos += "Altitude : "+position.coords.altitude +"\n";
  document.getElementById("geo_title").innerHTML = infopos;
});
*/



var target=document.getElementById("geo_title");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{target.innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)
  {
      document.getElementById("geo_title").innerHTML=
	  "LAT: " + position.coords.latitude + 
	  " | LONG: " + position.coords.longitude + 
	  " | ALT: " + position.coords.altitude;
      var latlon = position.coords.latitude+","+position.coords.longitude;
      var map_url="http://maps.googleapis.com/maps/api/staticmap?center="
	  +latlon+"&zoom=14&size=480x300&sensor=false";
      document.getElementById("mapholder").innerHTML=
	  "<img class=\"img-polaroid\" src='"+map_url+"'>";
  }
getLocation();
