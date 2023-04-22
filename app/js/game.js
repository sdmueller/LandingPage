define(["cameraHelper",
        "props",
        "lib/controller",
        "lib/three.min"], function(cameraHelper, props, keyboard, three) {
  var renderer, scene, camera, cube;
  var cubeSpeed = 0.01;

  function setup() {
    createScene();
    draw();
  }

  function createScene() {
    // set scene size
    var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
    var viewSize = 1;
    var near = 1;
    var far = 10;

    // create WebGL renderer
    renderer = new THREE.WebGLRenderer();

    // configure camera
    camera = new cameraHelper.Camera("ortho");
    camera.setViewport(viewSize, WIDTH, HEIGHT, near, far);
    camera.createCamera();
    camera.setPosition(0, 0, 5);

    // create scene
    scene = new THREE.Scene();

    // start renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach renderer-supplied DOM element (gameCanvas)
    var c = document.getElementById("gameCanvas");
    c.appendChild(renderer.domElement);

    // add small cube
    cube = new props.Cube(0.3, 1);
    cube.isWireframe(true);
    scene.add(cube.mesh);
  }

  function draw() {
    // draw THREE.JS scene
    renderer.render(scene, camera.cam);

    cube.mesh.rotation.x += 0.01;
    cube.mesh.rotation.y += 0.01;

    // loop draw() function
    requestAnimationFrame(draw);

    cubeMovement();
  }

  function cubeMovement() {
    if(Key.isDown(Key.A)) {
      cube.mesh.position.x -= cubeSpeed;
    }
    if(Key.isDown(Key.D)) {
      cube.mesh.position.x += cubeSpeed;
    }
    if(Key.isDown(Key.W)) {
      cube.mesh.position.y += cubeSpeed;
    }
    if(Key.isDown(Key.S)) {
      cube.mesh.position.y -= cubeSpeed;
    }
    if(Key.isTouch()) {
      touchPos = Key.getTouchPos();
      var diffX = cube.mesh.position.x - touchPos.x;
      if (diffX != 0) {
      	if (cube.mesh.position.x > touchPos.x) {cube.mesh.position.x -= cubeSpeed;}
      	if (cube.mesh.position.x < touchPos.x) {cube.mesh.position.x += cubeSpeed;}
      }
      var diffY = cube.mesh.position.y - touchPos.y;
      if (diffY != 0) {
      	if (cube.mesh.position.y > touchPos.y) {cube.mesh.position.y -= cubeSpeed;}
      	if (cube.mesh.position.y < touchPos.y) {cube.mesh.position.y += cubeSpeed;}
      }
    }
  }

  return {
    setup: setup,
    createScene: createScene,
    draw: draw,
    cubeMovement: cubeMovement
  };

});
