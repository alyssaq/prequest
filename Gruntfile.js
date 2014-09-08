'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['*.js', 'test/*.js']
    },

    express: {
      test: {
        options: {
          script: 'test/server.js',
          background: true,
          port: 4567,
          output: 'Server up'
        }
      }
    },

    cafemocha: {
      test: {
        options: {
          ui: 'bdd',
          reporter: 'list'
        },
        src: 'test/*Tests.js'
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-cafe-mocha');

  grunt.registerTask('test', ['jshint', 'express', 'cafemocha']);
  grunt.registerTask('default', 'test');
};

