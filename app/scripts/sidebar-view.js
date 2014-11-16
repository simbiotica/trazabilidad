define([
  'backbone'
], function(Backbone) {
  'use strict';

  var SidebarView = Backbone.View.extend({

    initialize: function() {
      console.log('Hello from SidebarView');
    }

  });

  return SidebarView;
});