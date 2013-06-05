(function() {
	
	var tmpl = '<%include "test/fixtures/testing.html" %>';

	var style = '<%include "test/fixtures/testing.css" %>';

	var config = '中文';

	$(function() {
		$(tmpl).appendTo($('body'));
		$('<style>'+ style + '</style>').appendTo($('head'));
	})

	alert(config)

}).call(window);