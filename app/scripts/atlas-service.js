define([
  'Class'
], function(Class) {
  'use strict';

  var AtlasService = Class.extend({

    init: function() {
      console.log('Hello form Atlas Service');
    }

  });

  return new AtlasService();
});