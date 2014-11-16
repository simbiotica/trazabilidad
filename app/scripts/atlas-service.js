define([
  'Class',
  'uri',
  'underscore',
  'backbone'
], function(Class, UriTemplate, _, Backbone) {
  'use strict';

  var AtlasService = Class.extend({

    products: [
      {
        name: 'Tomatoes',
        id: '0702'
      },
      {
        name: 'Onions',
        id: '0703'
      },
      {
        name: 'Cabbages',
        id: '0704'
      },
      {
        name: 'Lettuce',
        id: '0705'
      },
      {
        name: 'Root Vegetables',
        id: '0706'
      },
      {
        name: 'Cucumbers',
        id: '0707'
      },
      {
        name: 'Legumes',
        id: '0708'
      },
      {
        name: 'Other Vegetables',
        id: '0709'
      },
      {
        name: 'Cassava',
        id: '0714'
      },
      {
        name: 'Coconuts, Brazil Nuts, and Cashews',
        id: '0801'
      },
      {
        name: 'Other Nuts',
        id: '0802'
      },
      {
        name: 'Bananas',
        id: '0803'
      },
      {
        name: 'Tropical Fruits',
        id: '0804'
      },
      {
        name: 'Citrus',
        id: '0805'
      },
      {
        name: 'Grapes',
        id: '0806'
      },
      {
        name: 'Melons',
        id: '0807'
      },
      {
        name: 'Apples and Pears',
        id: '0808'
      },
      {
        name: 'Other Fruits',
        id: '0810'
      },
      {
        name: 'Coffee',
        id: '0901'
      },
      {
        name: 'Tea',
        id: '0902'
      },
      {
        name: 'MatŽ',
        id: '0903'
      },
      {
        name: 'Wheat',
        id: '1001'
      },
      {
        name: 'Rye',
        id: '1002'
      },
      {
        name: 'Barley',
        id: '1003'
      },
      {
        name: 'Oats',
        id: '1004'
      },
      {
        name: 'Corn',
        id: '1005'
      },
      {
        name: 'Rice',
        id: '1006'
      },
      {
        name: 'Buckwheat',
        id: '1008'
      },
      {
        name: 'Malt',
        id: '1107'
      },
      {
        name: 'Soybeans',
        id: '1201'
      },
      {
        name: 'Ground Nuts',
        id: '1202'
      },
      {
        name: 'Hops',
        id: '1210'
      },
      {
        name: 'Locust Beans',
        id: '1212'
      }
    ],

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