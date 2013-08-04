(function() {
	
	var tmpl = '<h1>Testing</h1><span>ss</span><div class="classname" style="display:block;
	background: #111;color:#fff">中文\'/"</div>';

	var style = '*{font-size:11px}body{font-family:"宋体";background:#ccc;_backgrund:#fff}';

	var config = '中文';

	$(function() {
		$(tmpl).appendTo($('body'));
		$('<style>'+ style + '</style>').appendTo($('head'));
	})

	alert(config)

}).call(window);