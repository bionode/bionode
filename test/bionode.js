var bionode = require('../')
var should = require('should')
var data = require('./data')

require('mocha')

describe("check sequence type", function() {
  it("should return strings 'dna', 'rna', 'ambiguousDna', 'ambiguousRna' or 'protein' from sequence following IUPAC guidelines.", function(done) {
    bionode.checkSequenceType(data.dnaSequence).should.equal('dna')
    bionode.checkSequenceType(data.rnaSequence).should.equal('rna')
    bionode.checkSequenceType(data.ambiguousDnaSequence).should.equal('ambiguousDna')
    bionode.checkSequenceType(data.ambiguousRnaSequence).should.equal('ambiguousRna')
    bionode.checkSequenceType(data.exon1Protein).should.equal('protein')
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
  it("should return a reversed string from sequence", function(done) {
    bionode.reverse(data.dnaSequence).should.equal(data.dnaReverseSequence)
    done()
  })
})

describe("complement", function() {
  it("should return complement string from sequence", function(done) {
    bionode.complement(data.dnaSequence).should.equal(data.dnaComplementSequence)
    bionode.complement(data.rnaSequence).should.equal(data.rnaComplementSequence)
    done()
  })
})

describe("reverse complement", function() {
  it("should return a reverse complemented string from sequence", function(done) {
    bionode.reverseComplement(data.dnaSequence).should.equal(data.dnaReverseComplementSequence)
    done()
  })
})

describe("transcribe base", function() {
  it("should return transcribe of base", function(done) {
    bionode.getTranscribedBase('A').should.equal('U')
    bionode.getTranscribedBase('a').should.equal('u')
    bionode.getTranscribedBase('T').should.equal('A')
    bionode.getTranscribedBase('t').should.equal('a')
    bionode.getTranscribedBase('C').should.equal('G')
    bionode.getTranscribedBase('c').should.equal('g')
    bionode.getTranscribedBase('G').should.equal('C')
    bionode.getTranscribedBase('g').should.equal('c')
    done()
  })
})

describe("transcribe", function() {
  it("should return rna string from dna string and vice versa", function(done) {
    bionode.transcribe(data.dnaSequence).should.equal(data.rnaSequence)
    bionode.transcribe(data.rnaSequence).should.equal(data.dnaSequence)
    done()
  })
})

describe("transcribe with exons", function() {
  it("should return rna string from dna string and remove introns if exons positions provided", function(done) {
    bionode.transcribe(data.simDNASequence, data.simExonsRanges).should.equal(data.simRNASequenceNoIntrons)
    done()
  })
})

describe("reverse exons", function() {
  it("should return right exons coordinates reversed from array of exons and reference length", function(done) {
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
  it("should return array with splices sites from reference and exons ranges", function(done) {
    bionode.findNonCanonicalSplices(data.dnaSequence, data.exonsRanges).should.eql([19272])
    done()
  })
})

describe("check canonical translation start site", function() {
  it("should return true if provided sequence starts with ATG/AUG", function(done) {
    bionode.checkCanonicalTranslationStartSite(data.simDNASequenceCanonicalTranslation).should.be.true
    bionode.checkCanonicalTranslationStartSite(data.simDNASequenceNonCanonicalTranslation).should.be.false
    done()
  })
})

describe("find longest open reading frame", function() {
  it("should return the dna or rna string of the longest reading frame", function(done) {
    bionode.findLongestOpenReadingFrame(data.simDNASequence).should.eql([data.simDNALongestReadingFrame, '+3'])
    bionode.findLongestOpenReadingFrame(data.simRNASequence).should.eql([data.simRNALongestReadingFrame, '+3'])
    done()
  })
})

describe("translate to amino acids", function() {
  it("should return the amino acids string from dna or rna string", function(done) {
    bionode.translate(data.simDNASequence).should.equal(data.simAASequence)
    bionode.translate(data.simRNASequence).should.equal(data.simAASequence)
    done()
  })
})
