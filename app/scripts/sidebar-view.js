define([
  'backbone',
  'highcharts',
  'jquery',
  'underscore',
  'atlas-service'
], function(Backbone, Highcharts, $, _, atlasService) {
  'use strict';

  var SidebarView = Backbone.View.extend({

  	el: '#chart',

    initialize: function() {
      var self = this;
    	this.products = $(atlasService.getProductsList());
    	this.$selector = this.$el.find('#productsSelector');

      this.products.each(function() {
          self.$selector.append('<option data =' + this.id + '>'+ this.name +'</option>');
        }
      );

      this.$selector.change(_.bind(this.getData, this));
      this.setListeners();
    },

    getData: function(e) {
      var name = $(e.currentTarget).val();
      var product = _.findWhere(this.products, {name: name});

      atlasService.get({
        product: product.id
      });
    },

    setListeners: function() {
      Backbone.Events.on('AtlasService/change', function(data) {

      });
    }

  });

  return SidebarView;
});