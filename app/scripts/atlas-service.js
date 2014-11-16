define([
  'Class',
  'uri',
  'underscore',
  'backbone',
  'd3',
  'text!country-names.csv'
], function(Class, UriTemplate, _, Backbone, d3, countryCsv) {
  'use strict';

  var AtlasService = Class.extend({

    products: [
      {
        name: 'Tomatoes',
        id: '0702',
        production: 4007000
      },
      {
        name: 'Onions',
        id: '0703',
        production: 1464700
      },
      {
        name: 'Cabbages',
        id: '0704',
        production: 325500
      },
      {
        name: 'Lettuce',
        id: '0705',
        production: 870200
      },
      {
        name: 'Root Vegetables',
        id: '0706',
        production: 907400
      },
      {
        name: 'Cucumbers',
        id: '0707',
        production: 713200
      },
      {
        name: 'Legumes',
        id: '0708',
        production: 293100
      },
      {
        name: 'Other Vegetables',
        id: '0709',
        production: 4828300
      },
      {
        name: 'Cassava',
        id: '0714',
        production: 28000
      },
      {
        name: 'Coconuts, Brazil Nuts, and Cashews',
        id: '0801',
        production: 0
      },
      {
        name: 'Other Nuts',
        id: '0802',
        production: 257100
      },
      {
        name: 'Bananas',
        id: '0803',
        production: 364600
      },
      {
        name: 'Tropical Fruits',
        id: '0804',
        production: 175700
      },
      {
        name: 'Citrus',
        id: '0805',
        production: 5501500
      },
      {
        name: 'Grapes',
        id: '0806',
        production: 0
      },
      {
        name: 'Melons',
        id: '0807',
        production: 1724500
      },
      {
        name: 'Apples and Pears',
        id: '0808',
        production: 973500
      },
      {
        name: 'Other Fruits',
        id: '0810',
        production: 529747
      },
      {
        name: 'Coffee',
        id: '0901',
        production: 0
      },
      {
        name: 'Tea',
        id: '0902',
        production: 0
      },
      {
        name: 'MatŽ',
        id: '0903',
        production: 0
      },
      {
        name: 'Wheat',
        id: '1001',
        production: 4650300
      },
      {
        name: 'Rye',
        id: '1002',
        production: 296700
       },
      {
        name: 'Barley',
        id: '1003',
        production: 5976900
      },
      {
        name: 'Oats',
        id: '1004',
        production: 683500
      },
      {
        name: 'Corn',
        id: '1005',
        production: 4234600
      },
      {
        name: 'Rice',
        id: '1006',
        production: 0
      },
      {
        name: 'Buckwheat',
        id: '1008',
        production: 0
      },
      {
        name: 'Malt',
        id: '1107',
        production: 0
      },
      {
        name: 'Soybeans',
        id: '1201',
        production: 0
      },
      {
        name: 'Ground Nuts',
        id: '1202'
      },
      {
        name: 'Hops',
        id: '1210',
        production: 0
      },
      {
        name: 'Locust Beans',
        id: '1212',
        production: 0 
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

    init: function() {
      this.countryNames = d3.csv.parse(countryCsv);
    },

    urlTemplate: 'http://atlas.media.mit.edu/{classification}/{tradeFlow}/' +
      '{year}/{origin}/{destination}/{product}/',

    get: function(params, callback) {
      var self = this;
      var url = this._getUrl(params);

      $.getJSON(url, function(d) {
        _.each(d.data, function(o) {
          var did = _.findWhere(self.countryNames, {dest_id: o.dest_id});
          var oid = _.findWhere(self.countryNames, {dest_id: o.origin_id});
          o.dest_id = did ? did.Abbrv : o.dest_id;
          o.origin_id = oid ? oid.Abbrv : o.origin_id;
          o.dest = did ? did.Name : o.dest_id;
          o.origin = oid ? oid.Name : o.origin_id;
        });
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