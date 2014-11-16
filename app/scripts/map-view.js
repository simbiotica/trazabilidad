define([
  'underscore',
  'backbone',
  'd3'
], function(_, Backbone, d3) {
  'use strict';

  var MapView = Backbone.View.extend({

    el: '#map',

    tileUrl: 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png',

    mapOptions: {
      zoom: 2,
      center: [15, 0],
      attributionControl: false,
    },

    initialize: function() {
      this._initMap();
      this._setSvg();
      this._setListeners();
    },

    _setListeners: function() {
      Backbone.Events.on('AtlasService/change', _.bind(this._updateProducts, this));
    },

    _updateProducts: function(product) {
      console.log(product.code);
    },

    _initMap: function() {
      this.map = L.map(this.el, this.mapOptions);
      L.tileLayer(this.tileUrl).addTo(this.map);
    },

    _setSvg: function() {
      var self = this;

      var svg = d3.select(this.map.getPanes().overlayPane)
        .append('svg')
        .append('g')
        .attr('class', 'leaflet-zoom-hide');

      var transform = d3.geo.transform({
        point: projectPoint
      });

      var d3path = d3.geo.path().projection(transform);

      function projectPoint(x, y) {
        var point = self.map.latLngToLayerPoint(new L.LatLng(y, x));
        self.stream.point(point.x, point.y);
      } 
    }

  });

  return MapView;
});