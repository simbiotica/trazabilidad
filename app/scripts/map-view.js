define([
  'backbone'
], function(Backbone) {
  'use strict';

  var MapView = Backbone.View.extend({

    initialize: function() {
      console.log('Hello from MapView');
    }

  });

  return MapView;
});