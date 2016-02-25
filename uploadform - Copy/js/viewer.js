var container, camera, controls, scene, mesh, renderer;

// Initialize and render components.
init();
render();

// Add event to button to choose STL model.
// Load the model and add it to the scene.
var button = document.getElementById("button");
button.addEventListener("change", function(event){
  // Remove previous mesh.
  scene.remove(mesh);

  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload=function(event){
    var data = event.target.result;
    var blob = new Blob([data], {'type' : file.type}); 
    var url = window.URL.createObjectURL(blob);      
    var loader = new THREE.STLLoader();
    loader.addEventListener('load', function(res) {
      var geometry = res.content;
      var material = new THREE.MeshLambertMaterial( { ambient: 0x000000, color: 0x2194ce} );
      mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( 0, 0, 0 );
      scene.add( mesh );
    });
    loader.load(url);
  };
  reader.readAsArrayBuffer(file);
}, false);

function init(){
  container = document.getElementById("viewer");

  camera = new THREE.PerspectiveCamera( 60, 800 / 600, 1, 1000 );
  camera.position.set( 0, 0, 50 );
   camera.position.z = 50;

  controls = new THREE.TrackballControls( camera );
  controls.rotateSpeed = 0.3;
  controls.noPan = true;
  controls.staticMoving = false;
  controls.dynamicDampingFactor = 0.2;

  scene = new THREE.Scene();

  scene.add(new THREE.AmbientLight(0x999999));
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);
  window.addEventListener('resize', function () {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
      });


  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( 800, 600 );
  renderer.setClearColor( 0xffffff, 1 );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  container.appendChild( renderer.domElement );
}

function render(){
  renderer.render( scene, camera );
  controls.update();
  requestAnimationFrame( render );
}
