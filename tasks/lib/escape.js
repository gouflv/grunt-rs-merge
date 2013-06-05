function escape(str, type) {
	if ('' == str) return '';
	var mark = (type === '.css') ? '\\' : '\\u';
	
	var rlt = [];
	var p = 0;
	
	for (var i=0, n=str.length; i<n; i++) {
		var c = str.charCodeAt(i);
		if (c > 0x7f) {
			if (i > p) {
				rlt.push(str.substring(p, i));
			}
			p = i + 1;
			var s = c.toString(16);
			if (s.length < 4) {
				s = ('0000' + s).substr(s.length, 4); // left side zero padding
			}
			rlt.push(mark + s);
		}
	}
	if (i > p) {
		rlt.push(str.substring(p, i));
	}
	
	return rlt.join('');
};

exports.css = function(source) {
	return escape(source, '.css');
};

exports.js = function(source) {
	return escape(source, '.js');
};
