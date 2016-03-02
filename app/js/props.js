define(["lib/three.min"], function(three) {

  //--------------- Cube ---------------------//
  var Cube = function(x, y, z) {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  // would be easier to do directly...
  Cube.prototype.rotateAdd = function(x, y, z) {
    this.mesh.rotation.x += x;
    this.mesh.rotation.y += y;
    this.mesh.rotation.z += z;
  }

  Cube.prototype.isWireframe = function(isWireframe) {
    this.material.wireframe = isWireframe;
  }

  return {
    Cube: Cube
  }
});
