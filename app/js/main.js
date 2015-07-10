//Define Router for SPA
'use strict';

$.ajaxPrefilter(function(options, originalOptions, jqHXR){
	options.url = 'http://localhost:3000' + options.url; 
}) 

var Reports = Backbone.Collection.extend({
	url: '/reports'
});

var ReportList = Backbone.View.extend({
	el: '#page',
	render: function() {
		var reports = new Reports();

		var _self = this;

		reports.fetch({

			success: function(reports){
				var template = _.template($('#reports-list-template').html());
				var data = {reports: reports.models }; 
				_self.$el.html(template(data));
			}
		})
	} 
});


var ReportView = Backbone.View.extend({
	el: '#page',
	render: function() {
		this.$el.html('This is report view');
	}
})


var reportList = new ReportList();

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'new': 'editReport' 
	}
});

var router = new Router();

router.on('route:home', function(){
	reportList.render();	
});

router.on('route:editReport', function(){
	var reportView = new ReportView();
	reportView.render();
});

Backbone.history.start({pushState: true});

$(document).on('click', 'a:not([data-bypass])', function (evt) {

    var href = $(this).attr('href');
    var protocol = this.protocol + '//';

    if (href.slice(protocol.length) !== protocol) {
      evt.preventDefault();
      router.navigate(href, true);
    }
  });