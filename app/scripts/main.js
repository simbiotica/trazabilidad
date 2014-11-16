'use strict';

require.config({
  baseUrl: './scripts',

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    text: '../../bower_components/requirejs-text/text',
    Class: '../../bower_components/Class.js/Class',
    underscoreString: '../../bower_components/underscore.string/lib/underscore.string'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    Class: {
      exports: 'Class'
    },
    underscoreString: {
      deps: ['underscore'],
      exports: '_string'
    }
  }

});

require([
  'atlas-service',
  'sidebar-view',
  'map-view'
], function(atlasService, SidebarView, MapView) {
  new SidebarView();
  new MapView();
});