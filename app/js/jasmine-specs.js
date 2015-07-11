describe('Backbone reporting Report model', function() {

  describe('when instantiated', function() {

    it('should exhibit attributes', function() {
      var report = new Report({
        country: 'UK'
      });
      expect(report.get('country'))
        .toEqual('UK');
    });
  });
});