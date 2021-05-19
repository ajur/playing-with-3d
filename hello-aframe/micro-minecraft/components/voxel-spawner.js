/* global AFRAME */

AFRAME.registerComponent('voxel-spawner', {
  schema: {
    size: {default: 0.5},
    class: {default: 'voxel'}
  },

  init: function () {
    if (this.el.components['color-picker']) {
      this.colorPicker = this.el.components['color-picker'];
    }
  },
  
  snap: function(v) {
    const step = this.data.size;
    const offset = step / 2.0;
    
    return v.divideScalar(step)
      .floor()
      .multiplyScalar(step)
      .addScalar(offset);
  },
  
  spawnPoint: function(intersection) {
    return this.snap(
      intersection.face.normal.clone()
        .multiplyScalar(0.1)
        .add(intersection.point));
  },
  
  pickColor: function() {
    if (this.colorPicker) {
      return this.colorPicker.color;
    } else {
      return '#' + Array.from({length: 6}).map(_ => Math.floor(Math.random() * 16).toString(16)).join('');
    }
  },
  
  events: {
    click: function(evt) {
      const voxel = document.createElement('a-box');
      
      voxel.setAttribute('position', this.spawnPoint(evt.detail.intersection));
      
      voxel.setAttribute('width', this.data.size);
      voxel.setAttribute('height', this.data.size);
      voxel.setAttribute('depth', this.data.size);
      
      voxel.classList.add(this.data.class);
      
      voxel.setAttribute('color', this.pickColor());
      
      this.el.sceneEl.appendChild(voxel);
    }
  }
});