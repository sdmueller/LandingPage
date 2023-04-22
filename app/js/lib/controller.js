// keyboard code from here: http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
window.addEventListener('pointerdown', function(event) { Key.onPointerdown(event); }, false);
window.addEventListener('pointerup', function(event) { Key.onPointerup(event); }, false);
window.addEventListener('pointermove', function(event) { Key.onPointermove(event); }, false);

function _getXAndYCoords(event) {
  // get touch event (uncomment to use mouse pointer as touch events)
  var touch = (event.touches && event.touches[0]) /*|| (event.pointerType && event.pointerType === 'touch' && event)*/;
  
  // normalized device coordinates -> screenToWorld
  if (touch) {
    x = ((touch /*|| event*/).clientX / window.innerWidth) * 2 - 1;
    y = -((touch /*|| event*/).clientY / window.innerHeight) * 2 + 1;
    return {x, y};
  }
  
  return null;
}

var Key = {
  _pressed: {},
  _pointer: {},
  keysPressed: 0,

  A: 65,
  W: 87,
  D: 68,
  S: 83,
  SPACE: 32,
  
  isIdle: function() {
    if(this.keysPressed == 0) {
      return true;
    } else {
      return false;
    }
  },

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
    this.keysPressed++;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
    this.keysPressed--;
  },
  
  onPointerdown: function(event) {
    var coords = _getXAndYCoords(event);
    if (coords) {
      this._pointer['x'] = coords.x;
      this._pointer['y'] = coords.y;
    }
  },
  
  onPointermove: function (event) {
    var coords = _getXAndYCoords(event);
    if (coords) {
      this._pointer['x'] = coords.x;
      this._pointer['y'] = coords.y;
    }
  },
  
  onPointerup: function(event) {
    delete this._pointer['x'];
    delete this._pointer['y'];
  },
  
  isTouch: function() {
    return this._pointer['x'] != null && this._pointer['y'] != null;
  },
  
  getTouchPos: function() {
    x = this._pointer['x'];
    y = this._pointer['y'];
    return {x, y};
  }
  
};
