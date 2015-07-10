//Define Router for SPA

var ReportList = Backbone.View.extend({
	el: '#page',
	render: function() {
		this.$el.html('On home page!');
	} 
});

var reportList = new ReportList();


var Router = Backbone.Router.extend({
	routes: {
		'': 'home' 
	}
});

var router = new Router();

router.on('route:home', function(){
	reportList.render();	
});

Backbone.history.start();











/*



var report = Backbone.Model.extend({
	defaults: {
		country: 'UK',
		population: 120000,
		sport: 'Football' 
	}
});

us_report = new report({
	country: 'us'
})

in_report = new report({
	country: 'in'
})

var reports = Backbone.Collection.extend({
	model: report
});


var finalReport = new reports ([us_report, in_report]);



var view = Backbone.View.extend({

	render: function() {
		this.el = $('#view').html('Backbone View');
	}

})


console.log(finalReport.models[1].toJSON())


myView = new view();
myView.render(); */