var maps;
function setup(){
	loadJSON("https://maps.googleapis.com/maps/api/js?key=AIzaSyC142DajwsHSKqox4-d7k8KB08YqLAcaVI&callback=initMap")
}

function gotData(data){
	//println(data;)
	maps = data;
}