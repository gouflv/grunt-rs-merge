/*
 * grunt-rs-merge
 *
 *
 * Copyright (c) 2013 gouflv
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var modules_path = require('path');

	grunt.registerMultiTask('rs_merge', 'rs-merge desc', function() {

		var option = this.options({});

		this.files.forEach(function(f) {

			var file = validFiles(f);

			var content = file.map(function(path) {
				var src =  grunt.file.read(path);
				return fileInclude(src);
			});

			grunt.file.write(f.dest, content.join(grunt.util.normalizelf(grunt.util.linefeed)));
			grunt.log.writeln('File ' + f.dest + ' created.');
		});
	});

	var fileInclude = function(src) {
		var fileExp = getIncludeFiles(src);
		
		fileExp.forEach(function(f) {

			if( modules_path.extname(f.path) === '.css' ) {
				f.file = cssParse( 
					minifyCSS( grunt.file.read(f.path) )
				);

			} else if( modules_path.extname(f.path).match('.html?') ) {
				f.file = htmlParse(
					minifyHTML( grunt.file.read(f.path) )
				);

			}
		});

		fileExp.forEach(function(exp) {
			src= src.replace(exp.expression, exp.file);
		});
		return src;
	};

	var getIncludeFiles = function(src) {
		var regex = /(<%include\s"([^(<%)]+)"\s?%>)+/ig;
		var m, res = [];
		while(m = regex.exec(src)) {
			if(m[2]) {
				res.push({ expression: m[0], path: m[2] });
			}
		}
		return res;
	};

	var validFiles = function(f) {
		return f.src.filter(function(path) {
			if (!grunt.file.exists(path)) {
				grunt.log.warn('Source file "' + path + '" not found.');
				return false;
			} else {
				return true;
			}
		});
	};

	var minifyCSS = function(source, options) {
		var config = {
			keepSpecialComments: 0
		};
		try {
			return require('clean-css').process(source, config);
		} catch (e) {
			grunt.log.error(e);
			grunt.fail.warn('css minification failed.');
		}
	};

	var minifyHTML = function(source, options) {
		var config = {
			removeComments: true,
			collapseWhitespace: true
		};
		try {
			return require('html-minifier').minify(source, config);
		} catch (e) {
			grunt.log.error(e);
			grunt.fail.warn('html minification failed.');
		}
	};

	var htmlParse = function(content) {
		return content.replace(/\'/g, '\\\'').replace(/\s+\r?\n\s+/g, ' ');
	};


	var cssParse = function(content) {
		return content.replace(/\'/g, '\"');
	};

};