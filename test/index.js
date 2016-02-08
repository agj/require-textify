'use strict';

var test = require('tape-catch');
var textify = require('../');
var concatStream = require('concat-stream');

test("Should process file when glob matches filename (in command line usage).", function (assert) {
	assert.plan(1);

	var stream = textify('/path/to/file.txt', { match: '**/*.txt' });
	stream.pipe(concatStream(function (result) {
		assert.equal(
			result.toString('utf8'),
			'module.exports = "text contents";'
		);
	}));
	stream.end(new Buffer('text contents', 'utf8'));
});

test("Should not process file when glob doesn't match filename (in command line usage).", function (assert) {
	assert.plan(1);

	var stream = textify('/path/to/file.txt', { match: '**/somewhere/else/*.log' });
	stream.pipe(concatStream(function (result) {
		assert.equal(
			result.toString('utf8'),
			'text contents'
		);
	}));
	stream.end(new Buffer('text contents', 'utf8'));
});

test("Should process file when glob matches filename (in API usage).", function (assert) {
	assert.plan(1);

	var stream = textify({ match: '**/*.txt' })('/path/to/file.txt');
	stream.pipe(concatStream(function (result) {
		assert.equal(
			result.toString('utf8'),
			'module.exports = "text contents";'
		);
	}));
	stream.end(new Buffer('text contents', 'utf8'));
});

test("Should not process file when glob doesn't match filename (in API usage).", function (assert) {
	assert.plan(1);

	var stream = textify({ match: '**/somewhere/else/*.log' })('/path/to/file.txt');
	stream.pipe(concatStream(function (result) {
		assert.equal(
			result.toString('utf8'),
			'text contents'
		);
	}));
	stream.end(new Buffer('text contents', 'utf8'));
});

