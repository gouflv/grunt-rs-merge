/*
 * grunt-rs-merge
 *
 *
 * Copyright (c) 2013 gouflv
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: [
					'Gruntfile.js',
					'tasks/*.js',
					'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		clean: {
			tests: ['tmp']
		},

		rs_merge: {
			ad_merge_task: {
				files: {
					'test/expected/main.js': [
						'test/fixtures/main.js',
						'test/fixtures/ext.js'
					]
				}
			}
		},

		uglify: {
			options: {
				preserveComments: false,
				mangle: false,
				beautify : {
					ascii_only : true
				}
			},
			dist: {
				files: {
					'test/expected/main.min.js': ['test/expected/main.js']
				}
			}
		},

		nodeunit: {
			tests: ['test/*_test.js']
		},

	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['clean', 'rs_merge', 'uglify']);

	grunt.registerTask('default', ['jshint', 'test']);

};