define([
  'Class'
], function(Class) {
  'use strict';

  var atlasService = Class.extend({

    init: function() {
      console.log('Hello form Atlas Service');
    }

  });

  return new atlasService();
});