define(["lib/three.min"], function(three) {

  var Camera = function(name) {
    this.name = name;
    this.viewport = null;
    this.cam = null;
  }

  Camera.prototype.getName = function() {
    return this.name;
  }

  Camera.prototype.setViewport = function(viewSize, width, height, near, far) {
    var aspectRatio = width / height;

    this.viewport = {
      viewSize: viewSize,
      aspectRatio: aspectRatio,
      left: (-aspectRatio * viewSize) / 2,
      right: (aspectRatio * viewSize) / 2,
      top: viewSize / 2,
      bottom: -viewSize / 2,
      near: near,
      far: far
    };
  }

  Camera.prototype.createCamera = function() {
    if(this.viewport) {
      this.cam = new  THREE.OrthographicCamera(this.viewport.left, this.viewport.right, this.viewport.top, this.viewport.bottom, this.viewport.near, this.viewport.far);
    } else {
      console.log("Viewport is null! Set viewport first with method setViewport().");
    }
  }

  Camera.prototype.update = function() {
    this.cam.updateProjectionMatrix();
  }

  Camera.prototype.setPosition = function(x, y, z) {
    this.cam.position.x = x;
    this.cam.position.y = y;
    this.cam.position.z = z;
  }

  return {
    Camera: Camera
  }

});
