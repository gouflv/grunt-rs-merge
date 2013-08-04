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
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'tasks/*.js',
				'test/expected/*.js'
			]
		},

		clean: {
			tests: ['test/expected']
		},

		rs_merge: {
			ad_merge_task: {
				files: {
					'test/expected/main.js': [
						'test/fixtures/main.js'
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
					'test/expected/main.min.js': [
						'test/expected/main.js'
					]
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['clean', 'rs_merge', 'uglify']);

};