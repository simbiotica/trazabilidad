define([
  'backbone'
], function(Backbone) {
  'use strict';

  var MapView = Backbone.View.extend({

    el: '#map',

    tileUrl: 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png',

    mapOptions: {
      zoom: 3,
      center: [15, 27],
      attributionControl: false,
    },

    initialize: function() {
      this._initMap();
    },

    _initMap: function() {
      this.map = L.map(this.el, this.mapOptions);
      L.tileLayer(this.tileUrl).addTo(this.map);
    }

  });

  return MapView;
});