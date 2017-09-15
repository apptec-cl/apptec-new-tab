var vertexHeight = 15000;
var planeDefinition = 100;
var planeSize = 1245000;
var totalObjects = 50000;
var frame = 60;

var container = document.createElement('div');
document.body.appendChild(container);

var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
camera.position.z = 50000;
camera.position.y = 15000;
camera.lookAt(new THREE.Vector3(0, 15900, 0));

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x23233f, 1, 300000);

var uniforms = {
  time: {
    type: "f",
    value: 0.0
  }
};

var material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
  wireframe: true,
  fog:true
});

var plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition), material);
plane.rotation.x -= Math.PI * .50;

scene.add(plane);

var geometry = new THREE.Geometry();

for (i = 0; i < totalObjects; i++) {
  var vertex = new THREE.Vector3();
  vertex.x = Math.random() * planeSize - (planeSize * .5);
  vertex.y = (Math.random() * 100000) + 10000;
  vertex.z = Math.random() * planeSize - (planeSize * .5);
  geometry.vertices.push(vertex);
}

var material = new THREE.ParticleBasicMaterial({
  size: 400
});
var particles = new THREE.ParticleSystem(geometry, material);

scene.add(particles);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight-10);
container.appendChild(renderer.domElement);

render();

function render() {
	requestAnimationFrame(render);
	camera.position.z -= 150;
	uniforms.time.value = frame;
	frame += .03;
	//  dateVerts();
	try{
		renderer.render(scene, camera);
	}
	catch(err){
	}
}

	function clock() {// We create a new Date object and assign it to a variable called "time".
var time = new Date(),
    
    // Access the "getHours" method on the Date object with the dot accessor.
    hours = time.getHours(),
    
    // Access the "getMinutes" method with the dot accessor.
    minutes = time.getMinutes(),
    
    
    seconds = time.getSeconds();

document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
  
  function harold(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}
setInterval(clock, 1000);

$.getJSON( "https://www.feriadosapp.com/api/holidays.json", function( data ) {
	x = 0
	$.each(data.data, function(key, value){
		setdate= value.date.split("-");
		date_for = new Date(value.date);
		date_new = new Date();			
		if(date_for > date_new){
			day = date_for.getDay();
			month = date_for.getMonth(),
			year = date_for.getFullYear();
			x++;
			$("#feriados").append('<li class="list-group-item"><span class="badge danger">' + setdate[2] + "-" + setdate[1] + "-" + setdate[0] + '</span><p class="list-group-item-heading">' + value.title + '</p><p class=" text-right list-group-item-text">' + value.extra + '</p></li>');
			return false;
		}
		if(x==5){
			return false;
		}
	});
});
$.getJSON( "http://mindicador.cl/api", function( data ) {
	$("#indicadores").append("<li class='list-group-item'>UF: <span class='pull-right'>"+data.uf.valor.toLocaleString('es', 2)+"</span></li>");
	$("#indicadores").append("<li class='list-group-item'>UTM: <span class='pull-right'>"+data.utm.valor.toLocaleString('es', 2)+"</span></li>");
	$("#indicadores").append("<li class='list-group-item'>DÓLAR: <span class='pull-right'>"+data.dolar.valor.toLocaleString('es', 2)+"</span></li>");
});

reallySimpleWeather.weather({
    wunderkey: '', // leave blank for Yahoo
    location: 'Santiago, SCL', //your location 
    woeid: '349035', // "Where on Earth ID"
    unit: 'c', // 'c' also works
    success: function(weather) {
      html = '<h3 class="text-center anaglyph" style="font-size: 85px;">'+weather.temp+'°'+weather.units.temp+'</h3>';
	  document.getElementById('weather').innerHTML = html;
    },
    error: function(error) {
	  document.getElementById('weather').innerHTML = '<p>'+error+'</p>';
    }
})