define([
  'underscore',
  'backbone',
  'd3',
  'timezones',
  'topojson'
], function(_, Backbone, d3, timezones, topojson) {
  'use strict';

  var MapView = Backbone.View.extend({

    el: '#map',

    initialize: function() {
      this._initMap();
      this._setListeners();
    },

    _setListeners: function() {
      Backbone.Events.on('AtlasService/change', _.bind(this._updateProducts, this));
    },

    _updateProducts: function(data) {
      console.log(data);
    },

    _initMap: function() {
      var width = this.$el.width(),
          height = this.$el.height();

      var projection = d3.geo.mercator()
          .scale(width / 2 / Math.PI)
          .translate([width / 2, height / 2])
          .precision(.1);

      var path = d3.geo.path()
          .projection(projection);

      var graticule = d3.geo.graticule();

      var svg = d3.select(this.el).append('svg')
          .attr('width', width)
          .attr('height', height);

      svg.append('path')
          .datum(graticule)
          .attr('class', 'graticule')
          .attr('d', path);

      path.projection(null);

      svg.insert('g', '.graticule')
          .attr('class', 'timezones')
        .selectAll('path')
          .data(topojson.feature(timezones, timezones.objects.timezones).features)
        .enter().append('path')
          .attr('d', path)
          .attr('class', function(d) {
            return d.id;
          })
        .append('title')
          .text(function(d) { return d.id; });

      svg.insert('path', '.graticule')
          .datum(topojson.mesh(timezones, timezones.objects.timezones, function(a, b) { return a !== b; }))
          .attr('class', 'boundary')
          .attr('d', path);

      d3.select(self.frameElement).style('height', height + 'px');
    }

  });

  return MapView;
});