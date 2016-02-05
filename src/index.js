'use strict';

var through = require('through2');
var path = require('path');
var minimatch = require('minimatch');

var passThrough = function () {
	return through(function (b, e, n) { n(null, b) });
};

module.exports = function (filename, options) {
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
				'\nmodule.exports = ' +
				JSON.stringify(Buffer.concat(data).toString('utf8')) +
				';\n'
			);
			end();
		}
	);
};
