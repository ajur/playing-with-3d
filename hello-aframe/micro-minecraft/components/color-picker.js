/* global AFRAME */

AFRAME.registerComponent('color-picker', {
  init: function () {
    this.indicator = this.createIndicator();
    
    this.colorIndex = 0;
    this.color = this.picoPalette[this.colorIndex];
    
    this.setColor(this.picoPalette[this.colorIndex]);
  },
  
  events: {
    thumbleftstart: function(evt) {
      this.colorIndex = (this.colorIndex - 1 + this.picoPalette.length) % this.picoPalette.length;
      this.setColor(this.picoPalette[this.colorIndex]);
    },
    thumbrightstart: function(evt) {
      this.colorIndex = (this.colorIndex + 1 + this.picoPalette.length) % this.picoPalette.length;
      this.setColor(this.picoPalette[this.colorIndex]);
    }
  },
    
  randomColor: function() {
    return '#' + Array.from({length: 6}).map(_ => Math.floor(Math.random() * 16).toString(16)).join('');
  },
  
  setColor: function(color) {
    this.color = color;
    this.indicator.setAttribute('color', color);
  },
  
  createIndicator: function(color) {
    const box = document.createElement('a-box');
    box.setAttribute('width', 0.02);
    box.setAttribute('height', 0.02);
    box.setAttribute('depth', 0.02);
    box.setAttribute('position', '0.05 0 0.02');
    box.setAttribute('color', '#ffffff');
    this.el.appendChild(box);
    return box;
  },
  
  picoPalette: [
    '#000000',
    '#1D2B53',
    '#7E2553',
    '#008751',
    '#AB5236',
    '#5F574F',
    '#C2C3C7',
    '#FFF1E8',
    '#FF004D',
    '#FFA300',
    '#FFEC27',
    '#00E436',
    '#29ADFF',
    '#83769C',
    '#FF77A8',
    '#FFCCAA'
  ]
});