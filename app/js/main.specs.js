  'use strict';

  // You can also use this for additonal matchers: https://github.com/froots/jasmine-sinon

  describe('Backbone reporting \'Report\' model', function() {

  	beforeEach(function() {
  		this.report = new Report({
  			country: 'UK'
  		});
  	});

  	describe('when instantiated', function() {
  		it('should exhibit attributes', function() {
  			expect(this.report.get('country')).toEqual('UK');
  		});
  	});

  	it('should return correct url', function() {
  		expect(this.report.url()).toEqual('/reports');
  	});


  	describe('Validation', function() {
  		it("should not save when population is empty", function() {
  			var eventSpy = sinon.spy();
  			this.report.on('invalid', eventSpy);
  			this.report.save({
  				'population': ''
  			});
  			expect(eventSpy.calledOnce).toBeTruthy();
  			expect(eventSpy.calledWith(
  				this.report,
  				"cannot have an empty population"
  			)).toBeTruthy();
  		});
  	});

  });


  describe('Fetch Reports collection', function() {
  	beforeEach(function() {
  		this.server = sinon.fakeServer.create();
  		this.reports = new Reports();
  	});

  	it('should make correct request', function() {
  		this.reports.fetch();
  		expect(this.server.requests.length).toEqual(1);
  		expect(this.server.requests[0].method).toEqual("GET");
  		expect(this.server.requests[0].url).toEqual('http://localhost:3000/reports'); // Running on localhost
  	});

  	afterEach(function() {
  		this.server.restore();
  	});
  });



  describe("Reporting router", function() {
  	beforeEach(function() {
  		this.router = new Router();
  		this.routeSpy = sinon.spy();
  	});

  	it("blank hash should be going to home", function() {
  		this.router.on("route:home", this.routeSpy);
  		this.router.navigate('', true);
  		expect(this.routeSpy.calledOnce).toBeTruthy();
  	});

  });