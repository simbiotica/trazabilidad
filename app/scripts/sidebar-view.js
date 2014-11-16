define([
  'backbone',
  'highcharts',
  'jquery'
], function(Backbone, Highcharts, $) {
  'use strict';

  var SidebarView = Backbone.View.extend({

  	el: '#chart',

    initialize: function() {
      console.log('Hello from SidebarView');
    },

    productSelector: function() {
    	this.$selector = this.$el.find('#productsSelector');
    	console.log(this.$selector);
    }

  });

  return SidebarView;
});