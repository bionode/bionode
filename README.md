<p align="center">
  <a href="http://bionode.io">
    <img height="200" width="200" title="bionode" alt="bionode logo" src="https://rawgithub.com/bionode/bionode/master/docs/bionode-logo.min.svg"/>
  </a>
  <br/>
  <a href="http://bionode.io/">bionode.io</a>
</p>
# bionode
> A Node.js JavaScript library for client and server side bioinformatics.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Gitter chat][gitter-image]][gitter-url]

Install
-------

Install bionode with [npm](//npmjs.org):

```sh
$ npm install bionode
```

You can also install it for client side with [bower](http://bower.io)

```sh
$ bower install bionode
```

Alternatively, just include `bionode.min.js` via a `<script/>` in your page.


Usage
-----

If you're using bionode with Node.js, you can require the module:

```js
var bionode = require('bionode')
```

In-browser, `bionode` is available as a global variable.

Please read the [documentation](//rawgithub.com/bionode/bionode/master/docs/bionode.html) for the methods exposed by bionode.


Contributing
------------

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

One way you can contribute to this project could be by checking other similar
projects like [biopython](http://www.biopython.org), [bioruby](http://bioruby.open-bio.org),
[biohaskell](//biohaskell.org), [bioperl](http://www.bioperl.org), etc, and reimplementing some
of their methods in JavaScript.

Currently, this project seeks methods to manipulate
biological data and not to visually represent it, ~~unlike [BioJS](http://www.ebi.ac.uk/Tools/biojs/registry/index.html)
which is a project of "Reusable components for presenting Biological data"~~.
Update: BioJS 2.0 is aiming to also work server side and currently collaborating with Bionode (see [issue 9](https://github.com/bionode/bionode/issues/9)).

### Contributors
Please see the file [contributors.md](contributors.md) for a list.

Purpose
-------
Having bioinformatic methods available in JavaScript is useful for many reasons, one of them is for integration with genome viewers in the browser.

We intend to use this module in the [afra](//github.com/yeban/afra) project.

Project Status
--------------
These are the features we have in mind to have first in short/medium term:

1. Databases
    1. [NCBI](http://github.com/bionode/bionode-ncbi) (already released, still getting improvements)
    2. EBI (1-2 devs started working on it)
    3. ENSEMBL (1-2 devs started working on it)
2. Wrappers
    1. BLAST (to do)
    2. BLAT (to do)
    3. Bowtie (to do)
    4. HMMER (to do)
    5. SRAToolkit (mostly done, needs cleanup/testing before release)
    6. SAMTOOLS (mostly done, needs cleanup/testing before release)
    7. BWA (mostly done, needs cleanup/testing before release)
3. Parsers
    1. FASTQ
    3. FASTA (almost done by [Alan Rice](https://github.com/alanrice))
    4. SAM/BAM (might be adapted from [Dalliance](http://github.com/dasmoth/dalliance) by [Thomas Down](http://github.com/dasmoth))
    5. VCF/BCF (same as above)
    6. BED (same as above)
    7. GFF (could come from JBrowse)

4. Wrangling
    1. Minimum needed to ensure connectivity between all modules
    2. Minimum needed to ensure integration with Dat and NoFlo

5. Module/ easy extensibility mechanism

Support
-------

If you find a bug please use the [issues](http://github.com/bionode/bionode/issues) tracker to report it.  
If you need help with this particular module, you can use the respective [gitter](http://gitter.im/bionode/bionode) chat room.  
For general help or discussion about the bionode project, you can use the IRC channel [#bionode](https://www.irccloud.com/#!/ircs://irc.freenode.net:6697/%23bionode) on Freenode.  
Bionode is collaborating with [BioJS](http://www.ebi.ac.uk/Tools/biojs/registry/index.html) which also has a IRC channel at [#biojs](https://www.irccloud.com/#!/ircs://irc.freenode.net:6697/%23biojs).

Contacts
--------
Bruno Vieira <[mail@bmpvieira.com](mailto:mail@bmpvieira.com)> [@bmpvieira](//twitter.com/bmpvieira)  
Yannick Wurm ([yannick.poulet.org](http://yannick.poulet.org)) [@yannick__](//twitter.com/yannick__)


License
-------

bionode is licensed under the [MIT](https://raw.github.com/bionode/bionode/master/LICENSE) license.  
Check [ChooseALicense.com](http://choosealicense.com/licenses/mit) for details.


[npm-url]: http://npmjs.org/package/bionode
[npm-image]: http://img.shields.io/npm/v/bionode.svg?style=flat
[travis-url]: http:////travis-ci.org/bionode/bionode
[travis-image]: http://img.shields.io/travis/bionode/bionode.svg?style=flat
[coveralls-url]: http:////coveralls.io/r/bionode/bionode
[coveralls-image]: http://img.shields.io/coveralls/bionode/bionode.svg?style=flat
[depstat-url]: http://david-dm.org/bionode/bionode
[depstat-image]: http://img.shields.io/david/bionode/bionode.svg?style=flat
[gitter-image]: http://img.shields.io/badge/gitter-bionode/bionode-brightgreen.svg?style=flat
[gitter-url]: https://gitter.im/bionode/bionode

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/bionode/bionode/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
