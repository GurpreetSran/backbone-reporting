module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/underscore/underscore.js',
      'bower_components/backbone/backbone.js',
      'app/js/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'sinon'],

    browsers: ['Chrome'],

    reporters: ['spec'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-sinon'
    ]
  });
};