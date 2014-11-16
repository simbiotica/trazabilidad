define([
  'Class',
  'uri',
  'underscore',
  'backbone'
], function(Class, UriTemplate, _, Backbone) {
  'use strict';

  var AtlasService = Class.extend({

    products: {
      'Potatoes': '0701',
      'Tomatoes': '0702',
      'Onions': '0703',
      'Cabbages': '0704',
      'Lettuce': '0705',
      'Root Vegetables': '0706',
      'Cucumbers': '0707',
      'Legumes': '0708',
      'Other Vegetables': '0709',
      'Cassava': '0714',
      'Coconuts, Brazil Nuts, and Cashews': '0801',
      'Other Nuts': '0802',
      'Bananas': '0803',
      'Tropical Fruits': '0804',
      'Citrus': '0805',
      'Grapes': '0806',
      'Melons': '0807',
      'Apples and Pears': '0808',
      'Other Fruits': '0810',
      'Coffee': '0901',
      'Tea': '0902',
      'MatŽ': '0903',
      'Wheat': '1001',
      'Rye': '1002',
      'Barley': '1003',
      'Oats': '1004',
      'Corn': '1005',
      'Rice': '1006',
      'Buckwheat': '1008',
      'Malt': '1107',
      'Soybeans': '1201',
      'Ground Nuts': '1202',
      'Hops': '1210',
      'Locust Beans': '1212'
    },

    defaults: {
      classification: 'hs',
      tradeFlow: 'export',
      year: 2012,
      origin: 'esp',
      destination: 'show',
      product: 'all'
    },

    urlTemplate: 'http://atlas.media.mit.edu/{classification}/{tradeFlow}/' +
      '{year}/{origin}/{destination}/{product}/',

    get: function(params, callback) {
      var url = this._getUrl(params);

      $.getJSON(url, function(d) {
        Backbone.Events.trigger('AtlasService/change', d.data);
        callback && callback(d.data);
      });
    },

    getProductsList: function() {
      return this.products;
    },

    _getUrl: function(params) {
      params = _.extend({}, this.defaults, params || {});
      var url = new UriTemplate(this.urlTemplate).fillFromObject(params);
      return decodeURIComponent(url);
    },


  });

  return new AtlasService();
});