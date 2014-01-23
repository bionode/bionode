var bionode = require('../')
var should = require('should')
var data = require('./data')

require('mocha')

describe("check sequence type", function() {
  it("should return strings 'dna' or 'rna' using sequence. Doesn't check for mixing errors", function(done) {
    bionode.checkSequenceType(data.dnaSequence).should.equal('dna')
    bionode.checkSequenceType(data.rnaSequence).should.equal('rna')
    done()
  })
})

describe("create complement base", function() {
  it("should return a function to complement bases depending on sequence type", function(done) {
    bionode.createComplementBase('dna').should.be.a.Function
    done()
  })
})


describe("reverse", function() {
  it("should return a reversed string using sequence", function(done) {
    bionode.reverse(data.dnaSequence).should.equal(data.dnaReverseSequence)
    done()
  })
})

describe("complement", function() {
  it("should return complement string using sequence", function(done) {
    bionode.complement(data.dnaSequence).should.equal(data.dnaComplementSequence)
    bionode.complement(data.rnaSequence).should.equal(data.rnaComplementSequence)
    done()
  })
})

describe("reverse complement", function() {
  it("should return a reverse complemented string using sequence", function(done) {
    bionode.reverseComplement(data.dnaSequence).should.equal(data.dnaReverseComplementSequence)
    done()
  })
})

describe("transcribe base", function() {
  it("should return transcribe of base", function(done) {
    bionode.getTranscribeBase('A').should.equal('U')
    bionode.getTranscribeBase('a').should.equal('u')
    bionode.getTranscribeBase('T').should.equal('A')
    bionode.getTranscribeBase('t').should.equal('a')
    bionode.getTranscribeBase('C').should.equal('G')
    bionode.getTranscribeBase('c').should.equal('g')
    bionode.getTranscribeBase('G').should.equal('C')
    bionode.getTranscribeBase('g').should.equal('c')
    done()
  })
})

describe("transcribe", function() {
  it("should return rna string from dna string and vice versa", function(done) {
    bionode.transcribe(data.dnaSequence).should.equal(data.rnaSequence)
    done()
  })
})

describe("reverse exons", function() {
  it("should return right exons coordinates reversed using array of exons and reference length", function(done) {
    var exonsRangesReversed = bionode.reverseExons(data.exonsRanges, data.length)
    exonsRangesReversed.should.eql(data.exonsRangesReversed)

    // More redundant tests to really check exons sequences and makes sure all is working as expected
    var dnaReverseSequence = bionode.reverse(data.dnaSequence)
    exonsRangesReversed.forEach(function(exonRangeReversed, i) {
      var exonDnaSequenceReversed = dnaReverseSequence.slice(exonRangeReversed[0], exonRangeReversed[1])
      var exonDnaSequence = bionode.reverse(exonDnaSequenceReversed)
      var trueExonDnaSequence = data.exonsDnaSequences[i]
      exonDnaSequence.should.equal(trueExonDnaSequence)
    })
    done()
  })
})

describe("find non canonical splices", function() {
  it("should return array with splices ranges using reference and exons ranges", function(done) {
    bionode.findNonCanonicalSplices(data.dnaSequence, data.exonsRanges).should.eql([ [ 19272, 23047 ] ])
    done()
  })
})
