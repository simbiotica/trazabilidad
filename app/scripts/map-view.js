define([
  'underscore',
  'backbone',
  'd3',
  'timezones',
  'topojson'
], function(_, Backbone, d3, timezones, topojson) {
  // 'use strict';

  var MapView = Backbone.View.extend({

    el: '#map',

    initialize: function() {
      this._initMap();
      this._setListeners();
    },

    _setListeners: function() {
      Backbone.Events.on('AtlasService/change', _.bind(this._updateProducts, this));
    },

    _getCentroid: function(selection) {
      // get the DOM element from a D3 selection
      // you could also use "this" inside .each()
      var element = selection.node();
          // use the native SVG interface to get the bounding box
          if (!element) {return;}
      var bbox = element.getBBox();
      // return the center of the bounding box
      return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
    },

    _updateProducts: function(data) {
      this.svg.selectAll('.route').remove();

      _.each(data, _.bind(function(d) {
        var zone = this.svg.select('#' + d.origin_id);
        var toZone = this.svg.select('#' + d.dest_id);
        var centroid = this._getCentroid(zone);
        var toCentroid = this._getCentroid(toZone);

        if (!centroid || !toCentroid) {return;}

        var lineFunction = d3.svg.line()
          .x(function(d) {return d[0];})
          .y(function(d) {return d[1];})
          .interpolate('monotone');

        var lineGraph = this.svg
          .append('path')
          .attr('d', lineFunction([centroid, toCentroid]))
          .attr('stroke', 'orange')
          .attr('stroke-width', 2)
          .attr('fill', 'none');

        // this.svg.append('svg:line')
        //   .attr('class', 'route')
        //   .attr('x1', centroid[0])
        //   .attr('x2', toCentroid[0])
        //   .attr('y1', centroid[1])
        //   .attr('y2', toCentroid[1]);

        // var route = {
        //   type: "LineString",
        //   coordinates: [
        //     centroid,
        //     toCentroid
        //   ]
        // };

        // this.svg.append("path")
        //   .datum(route)
        //   .attr("class", "route")
        //   .attr("d", this.path);
      }, this));
    },

    _initMap: function() {
      var m_width = $("#map").width(),
          width = 938,
          height = 500,
          country,
          state;

      var projection = d3.geo.mercator()
          .scale(150)
          .translate([width / 2, height / 1.5]);

      var path = this.path = d3.geo.path()
          .projection(projection);

      var svg = this.svg = d3.select("#map").append("svg")
          .attr("preserveAspectRatio", "xMidYMid")
          .attr("viewBox", "0 0 " + width + " " + height)
          .attr("width", m_width)
          .attr("height", m_width * height / width);

      svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height);

      var g = svg.append("g");

        g.append("g")
          .attr("id", "countries")
          .selectAll("path")
          .data(topojson.feature(timezones, timezones.objects.countries).features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.id; })
          .attr("d", path);
    }
  });

  return MapView;
});