module.exports = function(grunt) {

  var templateFilesToInject = [
    'templates/**/*.html'
  ];

  grunt.config.set('jshint', {
    // define the files to lint
    files: ['api/**/*','config/**/*'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
    // more options here if you want to override JSHint defaults
    laxcomma: true,
      globals: {
      jQuery: true,
        console: true,
        module: true
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
};
