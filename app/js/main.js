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
		this.el = $('#view').html('Backbone is shit');
	}

})


console.log(finalReport.models[1].toJSON())


myView = new view();
myView.render();