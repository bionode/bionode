bionode
=======

> A Node.js JavaScript library for client and server side bioinformatics.

Install
-------

Install bionode with [npm](https://npmjs.org/):

```sh
$ npm install bionode
```

Alternatively, just include `bionode.min.js` via a `<script/>` in your page.


Usage
-----

If you're using bionode with Node.js, you can require the module:

```js
var bionode = require('bionode')
```

In-browser, `bionode` is available as a global variable.

Please check the [documentation](https://rawgithub.com/bionode/bionode/master/docs/bionode.html) for the methods exposed by bionode.


Contributing
------------

To contribute to bionode, clone this repo locally and commit your code on a separate branch.

Please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
$ npm test
```

Also check for code coverage:
```sh
$ npm run coverage
```

To rebuild and minify the module for the browser do:
```sh
$ npm run build-browser
```

To rebuild the documentation from the comments in the code, run:
```sh
$ npm run build-docs
```

License
-------

bionode is licensed under the [MIT](https://raw.github.com/bionode/bionode/master/LICENSE) license.
