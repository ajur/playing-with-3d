/* global AFRAME */
AFRAME.registerComponent('random-color', {
  dependencies: ['material'],

  init: function () {
    // Set material component's color property to a random color.
    const color = '#' + Array.from({length: 6}).map(_ => Math.floor(Math.random() * 16).toString(16)).join('');
    this.el.setAttribute('material', 'color', color);
  }
});