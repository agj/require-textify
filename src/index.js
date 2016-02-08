'use strict';

var through = require('through2');
var minimatch = require('minimatch');

var passThrough = function () {
	return through(function (b, e, n) { n(null, b) });
};

module.exports = function (filename, options) {
	var requireTextify = function (filename) {
		console.log(filename);
		options = options || {};

		if (!options.match || !minimatch(filename, options.match))
			return passThrough();

		var data = [];
		return through(
			function (buffer, encoding, next) {
				data.push(buffer);
				next();
			},
			function (end) {
				this.push(
					'module.exports = ' +
					JSON.stringify(Buffer.concat(data).toString('utf8')) +
					';'
				);
				end();
			}
		);
	}

	if (typeof filename !== 'string') {
		options = filename;
		return requireTextify;
	} else {
		return requireTextify(filename);
	}
};
