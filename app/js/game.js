define(["cameraHelper",
        "props",
        "lib/keyboard",
        "lib/three.min"], function(cameraHelper, props, keyboard, three) {
  var renderer, scene, camera, cube;
  var cubeSpeed = 1;

  function setup() {
    createScene();
    draw();
  }

  function createScene() {
    // set scene size
    var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
    var viewSize = 3;
    var near = 0.1;
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

    // add cube
    cube = new props.Cube(1, 1, 1);
    cube.isWireframe(true);
    scene.add(cube.mesh);
  }

  function draw() {
    // draw THREE.JS scene
    renderer.render(scene, camera.cam);

    cube.rotateAdd(0.01, 0.01, 0);

    // loop draw() function
    requestAnimationFrame(draw);

    cubeMovement();
  }

  function cubeMovement() {
    if(Key.isDown(Key.A)) {
      cube.mesh.position.x -= cubeSpeed * 0.1;
    }
    if(Key.isDown(Key.D)) {
      cube.mesh.position.x += cubeSpeed * 0.1;
    }
    if(Key.isDown(Key.W)) {
      cube.mesh.position.y += cubeSpeed * 0.1;
    }
    if(Key.isDown(Key.S)) {
      cube.mesh.position.y -= cubeSpeed * 0.1;
    }
  }

  return {
    setup: setup,
    createScene: createScene,
    draw: draw,
    cubeMovement: cubeMovement
  };

});
