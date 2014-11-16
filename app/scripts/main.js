'use strict';

require.config({
  baseUrl: './scripts',

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    text: '../../bower_components/requirejs-text/text',
    Class: '../../bower_components/Class.js/Class',
    d3: '../../bower_components/d3/d3',
    underscoreString: '../../bower_components/underscore.string/lib/underscore.string',
    highcharts: '../../bower_components/highcharts-release/highcharts',
    uri: '../../bower_components/uri-templates/uri-templates'
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
    },
    highcharts: {
      exports: 'Highcharts'
    },
    uri: {
      exports: 'uri'
    }
  }

});

require([
  'sidebar-view',
  'map-view'
], function(SidebarView, MapView) {
  new SidebarView();
  new MapView();
});