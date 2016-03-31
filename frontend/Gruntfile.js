module.exports = function(grunt) {

  grunt.initConfig({
    serve: {
      options: {
        port: 10000
        }
      }
    });

  grunt.loadNpmTasks('grunt-serve');
};
