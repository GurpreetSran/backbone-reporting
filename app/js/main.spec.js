describe('Backbone reporting \'Report\' model', function() {

	var report = new Report({
		country: 'UK'
	});

	describe('when instantiated', function() {

		it('should exhibit attributes', function() {
			expect(report.get('country')).toEqual('UK');
		});
	});

	it('should return correct url', function() {
		expect(report.url()).toEqual('/reports');
	});


	describe('Validation', function() {
		it("should not save when population is empty", function() {
			var eventSpy = sinon.spy();
			report.on('invalid', eventSpy);
			report.save({
				'population': ''
			});
			expect(eventSpy.calledOnce).toBeTruthy();
			expect(eventSpy.calledWith(
				report,
				"cannot have an empty population"
			)).toBeTruthy(); 
		});
	});

});