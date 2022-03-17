var scene, camera, renderer, nitrogeno, hidrogeno, hidrogenoizq, hidrogenoder, union;



function init(){
  //Creación de una escena con fondo gris
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  //Creación y posicionado de la cámara
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 3;

  //Creación del render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // Añade la salida del renderer al documento HTML
  document.body.appendChild( renderer.domElement );

  //Creación y ubicación de la luz
  const light = new THREE.DirectionalLight();
  light.position.set(0,1,2);
  scene.add(light);

  //Creación y posicionamiento del átomo de Nitrógeno
  //Se establece como tamaño 0.6 unidades
  const geometryNitrogeno = new THREE.SphereGeometry( 0.6, 20, 20);
  const materialNitrogeno = new THREE.MeshStandardMaterial({color: new THREE.Color('blue')});
  nitrogeno = new THREE.Mesh(geometryNitrogeno, materialNitrogeno);
  nitrogeno.position.set(0,0,0)
  scene.add(nitrogeno);

  //Creación de plantilla para átomo de Hidrógeno
  //Se establece de tamaño la proporción que hay entre ambos atomos: 0.6*25/65
  const geometryHidrogeno = new THREE.SphereGeometry( 0.23, 20, 20);
  const materialHidrogeno = new THREE.MeshStandardMaterial({color: new THREE.Color('red')});

  //Creamos tres átomos de Hidrógeno
  hidrogenoizq = new THREE.Mesh(geometryHidrogeno, materialHidrogeno);
  hidrogenoder = new THREE.Mesh(geometryHidrogeno, materialHidrogeno);
  hidrogenoarr = new THREE.Mesh(geometryHidrogeno, materialHidrogeno);

  //Posicionamos los atomos a 2*radioDeNitrogeno+radioDeHidrogeno: 0.6*2+0.23=1.43 en los distintos ejes
  hidrogenoarr.position.set(0,1.43,0)
  scene.add(hidrogenoarr);

  hidrogenoder.position.set(1.43,0,0)
  scene.add(hidrogenoder);

  hidrogenoizq.position.set(-1.43,0,0)
  scene.add(hidrogenoizq);

  //Creamos plantilla de uniones entre átomos
  const geometryUnion = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 32 );
  const materialUnion = new THREE.MeshBasicMaterial( {color: 'white'} );

  //Creamos las tres uniones necesarias
  unionarr = new THREE.Mesh(geometryUnion, materialUnion);
  unionder = new THREE.Mesh(geometryUnion, materialUnion);
  unionizq = new THREE.Mesh(geometryUnion, materialUnion);

  //Colocamos las uniones a radioDeNitrogeno+0.5*tamañoDeCilindro: 0.6+0.5*0.6=0.9
  unionarr.position.set(0,0.9,0)
  scene.add(unionarr);

  // Como estos atomos están a la izquierda y a la derecha giramos el cilindro pi/2
  unionder.position.set(0.9,0,0)
  unionder.rotation.z = 1.5708;
  scene.add(unionder);

  unionizq.position.set(-0.9,0,0)
  unionizq.rotation.z = 1.5708;
  scene.add(unionizq);

  window.addEventListener( 'resize', onResize, false);

  update();
}

function update(){
  requestAnimationFrame( update );
	renderer.render( scene, camera );
}

function onResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
