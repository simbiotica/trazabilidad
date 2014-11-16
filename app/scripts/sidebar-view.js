define([
  'backbone',
  'jquery',
  'highcharts',
  'underscore',
  'atlas-service'
], function(Backbone, $, Highcharts, _, atlasService) {
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
        // var totalExport = 0;

        // $(data).each(function() {
        //   if (isNaN(this.export_val) || this.export_val === undefined){
        //     this.export_val = 0;
        //   }

        //   totalExport += this.export_val;
        // });

        var exportSeries = [];

        $(data).each(function() {
          if (isNaN(this.export_val) || this.export_val === undefined){
            this.export_val = 0;

          }
            var serie = {
              name: this.dest_id,
              data: [this.export_val]
            };

            exportSeries.push(serie);

          console.log(exportSeries);
        });

        $(function () {
          $('#barContainer').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Stacked bar chart'
            },
            xAxis: {
                categories: ['Export']
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: exportSeries
          });
        });

      });
    }

  });

  return SidebarView;
});