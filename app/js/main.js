//Define Router for SPA
'use strict';

$.ajaxPrefilter(function(options, originalOptions, jqHXR){
	options.url = 'http://localhost:3000' + options.url; 
}) 


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


var Reports = Backbone.Collection.extend({
	url: '/reports'
});

var Report = Backbone.Model.extend({
	urlRoot: '/reports'
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
		var template = _.template($('#report-template').html());
		this.$el.html(template);
	},
	
	events: {
		'submit .report-form': 'saveReport' 
	},

	saveReport: function(evt) {
		var reportDetails = $(evt.currentTarget).serializeObject();
		var report = new Report(); 
		report.save(reportDetails,{
			success: function() {
				console.log('success');
				router.navigate('', true)
			}
		});
		
		return false;
	} 
});


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