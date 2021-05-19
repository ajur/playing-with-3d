
AFRAME.registerComponent('voxel-remover', {
  dependencies: ['raycaster'],
  
  schema: {
    size: {default: 0.5},
    class: {default: 'voxel'},
  },
  
  init: function() {
    this.intersectedBox = null;
  },
  
  events: {
    'raycaster-intersection': function (evt) {
      console.log('!! raycaster intersection', evt.detail.els);
      console.log('raycaster', this.el.components.raycaster);
    },
    'raycaster-intersection-cleared': function (evt) {
      console.log('!! raycaster intersection cleared', evt.detail.clearedEls);
    },
    gripup: function (evt) {
      const intersections = Array.from(this.el.components.raycaster.intersections);
      
      if (intersections.length === 0) return;
      
      intersections.sort((a,b) => a.distance - b.distance);
      const el = intersections[0].object.el;
      
      if (!el.classList.contains(this.data.class)) return;
      
      el.remove();
    }
  }

});