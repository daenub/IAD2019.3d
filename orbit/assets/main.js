const degToRad = degrees => degrees * (Math.PI/180)

AFRAME.registerComponent("planet", {
  schema: {
    rotationSpeed: {type: "number", default: 1},
    travelingSpeed: {type: "number", default: 1},
    distance: {type: "number", default: 5},
    angle: {type: "number", default: 0},
    travel: {type: "boolean", default: true},
    rotate: {type: "boolean", default: true},
    positionOrigin: {type: "selector", default: null},
  },

  init: function () {
    // Closure to access fresh `this.data` from event handler context.
    var self = this;
    this.currentAngle = this.data.angle
    this.currentRotation = 0
  },

  tick: function () {
    if (this.data.travel) {
      let xOffset = 0
      let zOffset = 0

      if (this.data.positionOrigin) {
        xOffset = this.data.positionOrigin.object3D.position.x
        zOffset = this.data.positionOrigin.object3D.position.z
      }

      const x = this.data.distance * Math.cos(degToRad(this.currentAngle))
      const z = this.data.distance * Math.sin(degToRad(this.currentAngle))

      this.el.object3D.position.x = x + xOffset
      this.el.object3D.position.z = z + zOffset
      this.currentAngle += this.data.travelingSpeed
    }

    if (this.data.rotate) {
      // this.el.setAttribute("rotation", `0 ${this.currentRotation} 0`)
      this.el.object3D.rotation.y += this.data.rotationSpeed / 100
      // this.currentRotation += this.data.rotationSpeed
    }
  },

  schemaUpdate: function () {

  }
  
});