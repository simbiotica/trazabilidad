define([
  'Class',
  'uri',
  'underscore'
], function(Class, UriTemplate, _) {
  'use strict';

  var AtlasService = Class.extend({

    defaults: {
      classification: 'hs',
      tradeFlow: 'export',
      year: 2012,
      origin: 'esp',
      destination: 'show',
      product: 'all'
    },

    urlTemplate: 'http://atlas.media.mit.edu/{classification}/{tradeFlow}/{year}/{origin}/{destination}/{product}/',

    get: function(params, callback) {
      var url = this._getUrl(params);

      $.getJSON(url, function(d) {
        console.log('success');
        console.log(d);
        callback(d);
      });
    },

    _getUrl: function(params) {
      params = _.extend({}, this.defaults, params || {});
      var url = new UriTemplate(this.urlTemplate).fillFromObject(params);
      return decodeURIComponent(url);
    },


  });

  return new AtlasService();
});