# Contributing
We currently seek modules that implement methods to manipulate biological data (server or client side) or that wrap around server side tools.

They should provide as much as possible:
* Integration with [Node.js Streams](https://github.com/substack/stream-handbook);
* User friendly command line interface;
* [Modularity](http://nodejs.org/docs/latest/api/modules.html) ("do one thing well");
* Tests (we recommend [tape](https://github.com/substack/tape#tape));
* Aim for [100% code coverage](https://coveralls.io/r/bionode/bionode).

However, we believe that releasing **any code** publicly is better than keeping it private (especially in science), as long as people know what to expect from that code. That's why you shouldn't wait to have 100% code coverage before contributing to this project. Any contribution is welcome, just release whatever you have with badges in the [README.md](https://github.com/bionode/bionode/blob/master/README.md#bionode) and benefit as soon as possible from other contributors or discussions.  

We are focused on Node.js, Streams and command line interface for integration with other projects/languages. So, if you're interested in biological data visualisation in the browser, have a look at [BioJS](http://www.ebi.ac.uk/Tools/biojs/registry/index.html)
which aims to "Represent biological data on the web".
BioJS moved to the same module system ([NPM](http://npmjs.org)) as Bionode for better reusability (see [issue 9](https://github.com/bionode/bionode/issues/9)).

## How to
To contribute to bionode, clone this repo locally and commit your code on a separate branch.

Please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
$ npm test
```

Please also check for code coverage:

```sh
$ npm run coverage
```

To rebuild and minify the module for the browser:

```sh
$ npm run build-browser
```

To rebuild the documentation using the comments in the code:

```sh
$ npm run build-docs
```
