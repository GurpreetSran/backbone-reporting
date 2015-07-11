'use strict';

$.ajaxPrefilter(function(options, originalOptions, jqHXR) {
	options.url = 'http://localhost:3000' + options.url;
})


$.fn.serializeObject = function() {
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
	urlRoot: '/reports',
	validate: function(attrs) {
		if (!attrs.population) {
			return "cannot have an empty population";
		}
	}
});

var ReportList = Backbone.View.extend({
	el: '#page',
	render: function() {
		var reports = new Reports();

		var _self = this;

		reports.fetch({

			success: function(reports) {
				var template = _.template($('#reports-list-template').html());
				var data = {
					reports: reports.models
				};
				_self.$el.html(template(data));
			}
		});
	},
	events: {
		'click .delete-btn': 'deleteUser'
	},

	deleteUser: function(evt) {
		var _self = this;

		var reportId = $(evt.target).attr('data-report-id');

		var report = new Report({
			id: reportId
		});

		report.destroy({ // Get current record; 
			success: function(report) {
				_self.render();
			}
		});
	}
});


var ReportView = Backbone.View.extend({
	el: '#page',
	render: function(id) {

		var _self = this;

		if (id) {
			var report = new Report({
				id: id
			});
			report.fetch({ // Get current record; 
				success: function(report) {
					var template = _.template($('#report-template').html());
					var data = {
						report: report
					};
					_self.$el.html(template(data));
				}
			});

		} else {
			var template = _.template($('#report-template').html());
			var data = {
				report: null
			};
			this.$el.html(template(data));
		}
	},

	events: {
		'submit .report-form': 'saveReport'
	},

	saveReport: function(evt) {
		var reportDetails = $(evt.currentTarget).serializeObject();
		var report = new Report();
		var _self = this;
		
		report.on('invalid', function(report, error){
			console.log(error);
			return false;
		});	

		report.save(reportDetails, {
			success: function() {
				_self.undelegateEvents(); //Hack to undelegate events. 
				// More info available here: https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/

				router.navigate('', true)
			},
			error: function() {
				console.log('Error while saving report');
			}
		});

		return false;
	}
});

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'edit': 'editReport',
		'edit/:id': 'editReport'
	}
});

var router = new Router();

router.on('route:home', function() {
	var reportList = new ReportList();
	reportList.render();
});

router.on('route:editReport', function(id) {
	var reportView = new ReportView();
	reportView.render(id);
});

Backbone.history.start({
	pushState: true
});

$(document).on('click', 'a:not([data-bypass])', function(evt) {

	var href = $(this).attr('href');
	var protocol = this.protocol + '//';

	if (href.slice(protocol.length) !== protocol) {
		evt.preventDefault();
		router.navigate(href, true);
	}
});