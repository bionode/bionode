<p align="center">
<a href="http://bionode.io">
<img height="200" width="200" title="bionode" alt="bionode logo" src="https://rawgit.com/bionode/bionode/master/docs/bionode-logo.min.svg"/>
</a>
<br/>
<a href="http://bionode.io/">bionode.io</a>
</p>
# bionode
> Modular and universal bioinformatics

[![NPM](https://nodei.co/npm/bionode.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/bionode/)

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Gitter chat][gitter-image]][gitter-url]
[![DOI][doi-image]][doi-url]  
[![Stories in Ready at waffle.io][waffle-image]][waffle-url]

Bionode provides pipeable UNIX command line tools and JavaScript APIs for bioinformatic analysis workflows.


Install
-------

[Install Node.js](http://nodejs.org) (we recommend using [n](https://github.com/tj/n)).

If you want to install bionode in your current folder and use the **JavaScript API**, do:
```bash
npm install bionode
```

If you want to install it globally and use it as a **command line tool** add ```-g```, like:
```bash
npm install bionode -g
```

The previous commands will install all bionode modules currently available.
If you don't need all modules and prefer to be more selective, have a look at the [list of modules](#list-of-modules).


Usage
-----

If you're using bionode with Node.js, you can require the module:

```js
var bionode = require('bionode')
```

If you're using it as a command line tool, type bionode \<module\> \<command\> \<arguments\>, e.g.:

```bash
bionode ncbi search genome solenopsis invicta
```

Please read the [documentation](//rawgit.com/bionode/bionode/master/docs/bionode.html) for the methods exposed by bionode.


List of modules
--------------

The following are modules available/planned for Bionode.

| Name                   | Type          | Description                                       | Status<sup>1</sup>          | People<sup>2</sup>                                                    |
|------------------------|---------------|---------------------------------------------------|-----------------------------|-----------------------------------------------------------------------|
| [ncbi]                 | Data access   | Access to [NCBI API (e-utils)]                    | ![production][production]   |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [![maxogden][maxogden-img]][maxogden-url] [![mafintosh][mafintosh-img]][mafintosh-url] [![olgabot][olgabot-img]][olgabot-url] [![mlovci][mlovci-img]][mlovci-url] |
| [fasta]                | Parser        | Fasta parser                                      | ![request][production]      |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [seq]                  | Wrangling     | Sequence transformation (reverse complement, etc) | ![request][production]      |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [IsmailM][IsmailM-url] [![yeban][yeban-img]][yeban-url] |
| [template]             | Documentation | Example template module                           | ![request][production]      |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [JS pipeline]          | Documentation | JavaScript pipeline examples                      | ![request][production]      |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [Gasket pipeline]      | Documentation | [Gasket] pipeline example                         | ![request][production]      |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [Dat/Bionode workshop] | Documentation | Online workshop presented at [Mozfest 2014]       | ![request][production]      |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [ensembl]              | Data access   | Access to [ENSEMBL API]                           | ![request][production]         |  [![nerdstrike][nerdstrike-img]][nerdstrike-url] [![emepyc][emepyc-img]][emepyc-url] [![daviddao][daviddao-img]][daviddao-url] |
| [blast-parser]                | Parser      | [Basic Local Alignment Search Tool]               | ![request][production]         |  [![greenify][greenify-img]][greenify-url]                         |
| [sra]                  | Wrappers      | [SRA Toolkit]                                     | ![development][development] |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [![olgabot][olgabot-img]][olgabot-url] [![mlovci][mlovci-img]][mlovci-url] |
| [bwa]                  | Wrappers      | [Burrows-Wheeler Aligner]                         | ![development][development] |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [sam]                  | Wrappers      | [Sequence Alignment/Map tools]                    | ![development][development] |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [![ekg][ekg-img]][ekg-url] | 
| [bbi]                  | Parser        | [BBI (bigWig and bigBed)]                         | ![development][development] |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [![dasmoth][dasmoth-img]][dasmoth-url] |
| [ebi]                  | Data access   | Access to [EBI API]                               | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [![olgabot][olgabot-img]][olgabot-url] [![mlovci][mlovci-img]][mlovci-url] [![arq5x][arq5x-img]][arq5x-url] |
| [semantic]             | Data access   | Access to semantic web resources                  | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [![ktym][ktym-img]][ktym-url] |
| [vcf]                  | Parser        | [Variant Call Format] parser                      | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [gff]                  | Parser        | [General Feature Format] parser                   | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [bowtie]               | Wrappers      | [Bowtie aligner]                                  | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [sge]                  | Wrappers      | [Sun Grid Engine]                                 | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url] [![maxogden][maxogden-img]][maxogden-url] [![ekg][ekg-img]][ekg-url] [![gawbul][gawbul-img]][gawbul-url] [![mkuzak][mkuzak-img]][mkuzak-url] [badryan][badryan-url] |
| [blast]                | Wrappers      | [Basic Local Alignment Search Tool]               | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [vsearch]              | Wrappers      | [Search and clustering]                           | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [khmer]                | Wrappers      | [k-mer counting & filtering]                      | ![request][request]         |  [![bmpvieira][bmpvieira-img]][bmpvieira-url]                         |
| [rsem]                 | Wrappers      | [RNA-Seq by Expectation-Maximization]             | ![request][request]         |  [![olgabot][olgabot-img]][olgabot-url]                               |
| [gmap]                 | Wrappers      | [Genomic Mapping and Alignment Program]           | ![request][request]         |  [![olgabot][olgabot-img]][olgabot-url]                               |
| [star]                 | Wrappers      | [Spliced Transcripts Alignment to a Reference]    | ![request][request]         |  [![olgabot][olgabot-img]][olgabot-url]                               |
| [go]                   | Wrappers      | [Gene ontology]                                   | ![request][request]         |  [badryan][badryan-url]                               |

[ncbi]: https://github.com/bionode/bionode-ncbi
[NCBI API (e-utils)]: http://www.ncbi.nlm.nih.gov/books/NBK25501/
[fasta]: https://github.com/bionode/bionode-fasta
[seq]: https://github.com/bionode/bionode-seq
[template]: https://github.com/bionode/bionode-template
[JS pipeline]: https://github.com/bionode/bionode-examples
[Gasket pipeline]: https://github.com/bionode/bionode-example-dat-gasket
[Dat/Bionode workshop]: http://maxogden.github.io/get-dat
[Mozfest 2014]: http://schedule.mozillafestival.org/#session/-1I0CKguyr
[Gasket]: https://github.com/datproject/gasket
[sra]: https://github.com/bionode/bionode-sra
[SRA Toolkit]: http://www.ncbi.nlm.nih.gov/Traces/sra/sra.cgi?view=toolkit_doc
[bwa]: https://github.com/bionode/bionode-bwa
[Burrows-Wheeler Aligner]: http://bio-bwa.sourceforge.net
[sam]: https://github.com/bionode/bionode-sam
[Sequence Alignment/Map tools]: http://www.htslib.org
[bbi]: https://github.com/bionode/bionode-bbi
[BBI (bigWig and bigBed)]: http://genome.ucsc.edu/FAQ/FAQformat.html
[ebi]: https://github.com/bionode/bionode-ebi
[EBI API]: http://www.ebi.ac.uk/Tools/webservices/
[ensembl]: https://github.com/daviddao/biojs-rest-ensembl
[ENSEMBL API]: http://rest.ensembl.org
[semantic]: https://github.com/bionode/bionode-semantic
[vcf]: https://github.com/bionode/bionode-vcf
[Variant Call Format]: http://samtools.github.io/hts-specs/VCFv4.2.pdf
[gff]: https://github.com/bionode/bionode-gff
[General Feature Format]: https://www.sanger.ac.uk/resources/software/gff/spec.html
[bowtie]: https://github.com/bionode/bionode-bowtie
[Bowtie aligner]: http://bowtie-bio.sourceforge.net/index.shtml
[sge]: https://github.com/bionode/bionode-sge
[SUN Grid Engine]: https://arc.liv.ac.uk/trac/SGE
[blast]: https://github.com/bionode/bionode-blast
[blast-parser]: https://github.com/greenify/biojs-io-blast
[Basic Local Alignment Search Tool]: http://www.ncbi.nlm.nih.gov/books/NBK1763/
[vsearch]: https://github.com/bionode/bionode-vsearch
[Search and clustering]: https://github.com/torognes/vsearch
[khmer]: https://github.com/bionode/bionode-khmer
[k-mer counting & filtering]: http://khmer.readthedocs.org/en/v1.1/
[rsem]: https://github.com/bionode/bionode-rsem
[RNA-Seq by Expectation-Maximization]: https://github.com/bli25wisc/RSEM
[gmap]: https://github.com/bionode/bionode-gmap
[Genomic Mapping and Alignment Program]: http://research-pub.gene.com/gmap/
[star]: https://github.com/bionode/bionode-star
[Spliced Transcripts Alignment to a Reference]: https://github.com/alexdobin/STAR
[go]: https://github.com/bionode/bionode-go
[Gene ontology]: http://en.wikipedia.org/wiki/Gene_ontology


[1]: Current status of the module
* ![production][production] means the module is still in development but has many features complete and is used intensively. 
* ![development][development] means the module still lacks some features, tests or has some issues.
* ![request][request] means the module has been requested, discussed and planned, but is not yet implemented.

[2]: People involved in this module, either through code contribution, ideas or discussion.

[production]:https://img.shields.io/badge/status-production-green.svg?style=flat-square
[development]:https://img.shields.io/badge/status-development-orange.svg?style=flat-square
[request]:https://img.shields.io/badge/status-request-blue.svg?style=flat-square

[bmpvieira-img]: https://avatars3.githubusercontent.com/u/263386?v=3&s=40
[bmpvieira-url]: https://github.com/bmpvieira
[maxogden-img]: https://avatars3.githubusercontent.com/u/39759?v=3&s=40
[maxogden-url]: https://github.com/maxogden
[mafintosh-img]: https://avatars3.githubusercontent.com/u/376661?v=3&s=40
[mafintosh-url]: https://github.com/mafintosh
[olgabot-img]: https://avatars3.githubusercontent.com/u/806256?v=3&s=40
[olgabot-url]: https://github.com/olgabot
[mlovci-img]: https://avatars3.githubusercontent.com/u/909047?v=3&s=40
[mlovci-url]: https://github.com/mlovci
[arq5x-img]: https://avatars3.githubusercontent.com/u/72291?v=3&s=40
[arq5x-url]: https://github.com/arq5x
[ktym-img]: https://pbs.twimg.com/profile_images/1124266319/ktym_normal.jpg
[ktym-url]: https://github.com/ktym
[ekg-img]: https://avatars3.githubusercontent.com/u/145425?v=3&s=40
[ekg-url]: https://github.com/ekg
[badryan-img]: https://avatars3.githubusercontent.com/u/6317446?v=3&s=40
[badryan-url]: https://github.com/badryan
[gawbul-img]: https://avatars3.githubusercontent.com/u/321291?v=3&s=40
[gawbul-url]: https://github.com/gawbul
[mkuzak-img]: https://avatars3.githubusercontent.com/u/208443?v=3&s=40
[mkuzak-url]: https://github.com/mkuzak
[dasmoth-img]: https://avatars3.githubusercontent.com/u/209047?v=3&s=40
[dasmoth-url]: https://github.com/dasmoth
[IsmailM-img]: https://avatars3.githubusercontent.com/u/5578375?v=3&s=40
[IsmailM-url]: https://github.com/IsmailM
[yeban-img]: https://avatars3.githubusercontent.com/u/90373?v=3&s=40
[yeban-url]: https://github.com/yeban
[nerdstrike-img]: https://avatars3.githubusercontent.com/u/5434501?v=3&s=40
[nerdstrike-url]: https://github.com/nerdstrike
[emepyc-img]: https://avatars3.githubusercontent.com/u/473962?v=3&s=40
[emepyc-url]: https://github.com/emepyc
[daviddao-img]: https://avatars0.githubusercontent.com/u/1241240?v=3&s=40
[daviddao-url]: https://github.com/daviddao
[greenify-img]: https://avatars1.githubusercontent.com/u/4370550?v=3&s=40
[greenify-url]: https://github.com/greenify

Support
-------

If you find a bug please use the [issues](http://github.com/bionode/bionode/issues) tracker to report it.  
If you need help with this particular module, you can use the respective [gitter](http://gitter.im/bionode/bionode) chat room.  
For general help or discussion about the bionode project, you can use the IRC channel [#bionode](https://www.irccloud.com/#!/ircs://irc.freenode.net:6697/%23bionode) on Freenode.  
Bionode is collaborating with [BioJS](http:/biojs.net) which also has a IRC channel at [#biojs](https://www.irccloud.com/#!/ircs://irc.freenode.net:6697/%23biojs).


Contributing
------------
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute to this project.  
For a list of contributors, see the file [contributors.md](contributors.md).


Contacts
--------
[Bruno Vieira](http://bmpvieira.com) <[mail@bmpvieira.com](mailto:mail@bmpvieira.com)> [@bmpvieira](//twitter.com/bmpvieira)  
Yannick Wurm ([yannick.poulet.org](http://wurmlab.github.io)) [@yannick__](//twitter.com/yannick__)


License
-------

bionode is licensed under the [MIT](https://raw.github.com/bionode/bionode/master/LICENSE) license.  
Check [ChooseALicense.com](http://choosealicense.com/licenses/mit) for details.

[npm-url]: http://npmjs.org/package/bionode
[npm-image]: http://img.shields.io/npm/v/bionode.svg?style=flat-square
[travis-url]: http:////travis-ci.org/bionode/bionode
[travis-image]: http://img.shields.io/travis/bionode/bionode.svg?style=flat-square
[coveralls-url]: http:////coveralls.io/r/bionode/bionode
[coveralls-image]: http://img.shields.io/coveralls/bionode/bionode.svg?style=flat-square
[depstat-url]: http://david-dm.org/bionode/bionode
[depstat-image]: http://img.shields.io/david/bionode/bionode.svg?style=flat-square
[gitter-image]: http://img.shields.io/badge/gitter-bionode/bionode-brightgreen.svg?style=flat-square
[gitter-url]: https://gitter.im/bionode/bionode
[waffle-image]: https://badge.waffle.io/bionode/bionode.png?label=ready&title=issues%20ready
[waffle-url]: https://waffle.io/bionode/bionode
[doi-url]: http://dx.doi.org/10.5281/zenodo.11487
[doi-image]: http://img.shields.io/badge/doi-10.5281/zenodo.11487-blue.svg?style=flat-square
