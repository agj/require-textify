
require-textify
===============

[![Build Status](https://travis-ci.org/agj/require-textify.svg?branch=master)](https://travis-ci.org/agj/require-textify)
[![Dependency Status](https://david-dm.org/agj/require-textify.svg)](https://david-dm.org/agj/require-textify)

A [Node][node] (javascript) package that provides a [Browserify][browserify] transform to allow using `require` on files to get them as plain text (UTF-8), selecting them by a glob pattern (using [minimatch][minimatch]).

Based on the [stringify][stringify] transform, which does something similar but only allows identifying files by their extension. My use case was a bit more complicated, so I decided to create this alternative package.

[node]: https://nodejs.org/
[browserify]: http://browserify.org/
[minimatch]: https://github.com/isaacs/minimatch
[stringify]: https://github.com/JohnPostlethwait/stringify


## Example

For a file `README`:

```
This is the content of the readme file.
```

In your javascript you can do:

```js
var readmeText = require('./README');
console.log(readmeText); // => This is the content of the readme file.
```

And specify a glob pattern that matches the readme file when using Browserify to pack your app, in the command line like so:

```sh
browserify -t [ require-textify --match **/README ] ./
```


## Install

```sh
npm install require-textify
```


## Usage

require-textify only requires files as UTF-8 strings when the filename matches a glob pattern, such as these:

* `**/*.txt` will match any file with the `.txt` extension.
* `**/folder/file` will match any file named `file` under a folder `folder`.
* `**/debug*.log` will match files named `debug2.log`, `debug-output.log`, etc.

### From the command line

After installing in your project folder, run browserify from the command line the following way, specifying a `globPattern` pattern to test against required filenames.

```sh
browserify -t [ require-textify --match globPattern ] main.js
```

### From javascript

The below pattern allows specifying a `globPattern` pattern when using the require-textify transform.

```js
var browserify = require('browserify');
var textify = require('require-textify');
var fs = require('fs');

browserify('main.js')
    .transform(textify({ match: globPattern }))
    .bundle()
    .pipe(fs.createWriteStream('bundle.js'));
```


## License

Copyright (c) 2015, agj

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

