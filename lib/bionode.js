module.exports = exports = bionode = new Bionode()

function Bionode() {}

// ## Sequence manipulation
// ---

// Create matrices for converting between genetic code bases.
var _baseMatrix = { A: 'T', C: 'G', W: 'S', M: 'K', R: 'Y', B: 'V', D: 'H' }

var _dnaComplementBasesMatrix = Object.create(_baseMatrix)
var _rnaComplementBasesMatrix = Object.create(_baseMatrix)
var _transcribeBasesMatrix = Object.create(_baseMatrix)
var _translateCodonsMatrix = {
  'GCU': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A', 'CGU': 'R', 'CGC': 'R',
  'CGA': 'R', 'CGG': 'R', 'AGA': 'R', 'AGG': 'R', 'AAU': 'N', 'AAC': 'N',
  'GAU': 'D', 'GAC': 'D', 'UGU': 'C', 'UGC': 'C', 'CAA': 'Q', 'CAG': 'Q',
  'GAA': 'E', 'GAG': 'E', 'GGU': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G',
  'CAU': 'H', 'CAC': 'H', 'AUU': 'I', 'AUC': 'I', 'AUA': 'I', 'UUA': 'L',
  'UUG': 'L', 'CUU': 'L', 'CUC': 'L', 'CUA': 'L', 'CUG': 'L', 'AAA': 'K',
  'AAG': 'K', 'AUG': 'M', 'UUU': 'F', 'UUC': 'F', 'CCU': 'P', 'CCC': 'P',
  'CCA': 'P', 'CCG': 'P', 'UCU': 'S', 'UCC': 'S', 'UCA': 'S', 'UCG': 'S',
  'AGU': 'S', 'AGC': 'S', 'ACU': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
  'UGG': 'W', 'UAU': 'Y', 'UAC': 'Y', 'GUU': 'V', 'GUC': 'V', 'GUA': 'V',
  'GUG': 'V', 'UAA': '*', 'UGA': '*', 'UAG': '*', 'XAA': 'X', 'XAC': 'X',
  'XAG': 'X', 'XAU': 'X', 'XCA': 'X', 'XCC': 'X', 'XCG': 'X', 'XCU': 'X',
  'XGA': 'X', 'XGC': 'X', 'XGG': 'X', 'XGU': 'X', 'XUA': 'X', 'XUC': 'X',
  'XUG': 'X', 'XUU': 'X', 'XAX': 'X', 'XCX': 'X', 'XGX': 'X', 'XUX': 'X',
  'XXA': 'X', 'XXC': 'X', 'XXG': 'X', 'XXU': 'X', 'XXX': 'X',
  'gcu': 'a', 'gcc': 'a', 'gca': 'a', 'gcg': 'a', 'cgu': 'r', 'cgc': 'r',
  'cga': 'r', 'cgg': 'r', 'aga': 'r', 'agg': 'r', 'aau': 'n', 'aac': 'n',
  'gau': 'd', 'gac': 'd', 'ugu': 'c', 'ugc': 'c', 'caa': 'q', 'cag': 'q',
  'gaa': 'e', 'gag': 'e', 'ggu': 'g', 'ggc': 'g', 'gga': 'g', 'ggg': 'g',
  'cau': 'h', 'cac': 'h', 'auu': 'i', 'auc': 'i', 'aua': 'i', 'uua': 'l',
  'uug': 'l', 'cuu': 'l', 'cuc': 'l', 'cua': 'l', 'cug': 'l', 'aaa': 'k',
  'aag': 'k', 'aug': 'm', 'uuu': 'f', 'uuc': 'f', 'ccu': 'p', 'ccc': 'p',
  'cca': 'p', 'ccg': 'p', 'ucu': 's', 'ucc': 's', 'uca': 's', 'ucg': 's',
  'agu': 's', 'agc': 's', 'acu': 't', 'acc': 't', 'aca': 't', 'acg': 't',
  'ugg': 'w', 'uau': 'y', 'uac': 'y', 'guu': 'v', 'guc': 'v', 'gua': 'v',
  'gug': 'v', 'uaa': '*', 'uga': '*', 'uag': '*', 'xaa': 'x', 'xac': 'x',
  'xag': 'x', 'xau': 'x', 'xca': 'x', 'xcc': 'x', 'xcg': 'x', 'xcu': 'x',
  'xga': 'x', 'xgc': 'x', 'xgg': 'x', 'xgu': 'x', 'xua': 'x', 'xuc': 'x',
  'xug': 'x', 'xuu': 'x', 'xax': 'x', 'xcx': 'x', 'xgx': 'x', 'xux': 'x',
  'xxa': 'x', 'xxc': 'x', 'xxg': 'x', 'xxu': 'x', 'xxx': 'x'
}

_rnaComplementBasesMatrix['A'] = 'U'
delete _rnaComplementBasesMatrix['T']

_transcribeBasesMatrix['A'] = 'U'

mirrorAndLowerCaseMatrices([
  _dnaComplementBasesMatrix,
  _rnaComplementBasesMatrix,
  _transcribeBasesMatrix
])

_transcribeBasesMatrix['T'] = 'A'
_transcribeBasesMatrix['t'] = 'a'

// Helper function to mirror bases for translation (e.g. A<->T) and also add lowerCases.
function mirrorAndLowerCaseMatrices(matricesArray) {
  matricesArray.forEach(function(matrix) {
    for (var k in matrix) {
      var v = matrix[k]
      matrix[k.toLowerCase()] = v.toLowerCase()
      matrix[v] = k
      matrix[v.toLowerCase()] = k.toLowerCase()
    }
  })
}

// ### Check sequence type

// Takes a sequence string and checks if it's DNA, RNA or protein. Follows [IUPAC notation](http://en.wikipedia.org/wiki/Nucleic_acid_notation#IUPAC_notation) which allows ambiguous sequence notation. In this case the sequence is labelled as ambiguous nucleotide rather than amino acid sequence.
//
//     bionode.checkSequenceType("ATGACCCTGAGAAGAGCACCG");
//     => "dna"
//     bionode.checkSequenceType("AUGACCCUGAAGGUGAAUGAA");
//     => "rna"
//     bionode.checkSequenceType("MAYKSGKRPTFFEVFKAHCSDS");
//     => "protein"
//     bionode.checkSequenceType("AMTGACCCTGAGAAGAGCACCG");
//     => "ambiguousDna"
//     bionode.checkSequenceType("AMUGACCCUGAAGGUGAAUGAA");
//     => "ambiguousRna"
Bionode.prototype.checkSequenceType = function(sequence) {
  var acgMatch = sequence.match(/[ACG]/i);
  var tMatch = sequence.match(/[T]/i);
  var nMatch = sequence.match(/[N]/i);
  var uMatch = sequence.match(/[U]/i);
  var potentialNucleotideMatch = sequence.match(/[WSMKRYBDHV]/i);
  var proteinMatch = sequence.match(/[EFIJLOPQZX\*]/i);
  if (proteinMatch) {
    return "protein";
  } else if (acgMatch && !potentialNucleotideMatch && !uMatch) {
    return "dna";
  } else if (acgMatch && potentialNucleotideMatch && !uMatch) {
    return "ambiguousDna";
  } else if (acgMatch && !potentialNucleotideMatch && uMatch && !tMatch) {
    return "rna";
  } else if (acgMatch && potentialNucleotideMatch && uMatch && !tMatch) {
    return "ambiguousRna";
  }
}

// Takes a sequence type argument and returns a function to complement bases.
Bionode.prototype.createComplementBase = function(sequenceType) {
  var complementBasesMatrix = (sequenceType === 'rna' || sequenceType === 'ambiguousRna') ? _rnaComplementBasesMatrix : _dnaComplementBasesMatrix
  var getComplementBase = function(base) {
    var complement = complementBasesMatrix[base]
    return complement || base
  }
  return getComplementBase
}

// ### Reverse sequence

// Takes sequence string and returns the reverse sequence.
//
//     bionode.reverse("ATGACCCTGAAGGTGAA");
//     => "AAGTGGAAGTCCCAGTA"
Bionode.prototype.reverse = function(sequence) {
  return sequence.split('').reverse().join('')
}

// ### (Reverse) complement sequence

// Takes a sequence string and optional boolean for reverse, and returns its complement.
//
//     bionode.complement("ATGACCCTGAAGGTGAA");
//     => "TACTGGGACTTCCACTT"
//     bionode.complement("ATGACCCTGAAGGTGAA", true);
//     => "TTCACCTTCAGGGTCAT"
//     //Alias
//     bionode.reverseComplement("ATGACCCTGAAGGTGAA");
//     => "TTCACCTTCAGGGTCAT"
Bionode.prototype.complement = function(sequence, reverse) {
  var reverse = reverse || false
  var sequenceType = bionode.checkSequenceType(sequence)
  var getComplementBase = bionode.createComplementBase(sequenceType)
  if (reverse) {
    return sequence.split('').reverse().map(getComplementBase).join('')
  }
  else {
    return sequence.split('').map(getComplementBase).join('')
  }
}

// Takes a sequence string and returns the reverse complement (syntax sugar).
Bionode.prototype.reverseComplement = function(sequence) {
  return bionode.complement(sequence, true)
}

// ### Transcribe base

// Takes a base character and returns the transcript base.
//
//     bionode.getTranscribedBase("A");
//     => "U"
//     bionode.getTranscribedBase("T");
//     => "A"
//     bionode.getTranscribedBase("t");
//     => "a"
//     bionode.getTranscribedBase("C");
//     => "G"
Bionode.prototype.getTranscribedBase = function(base) {
  return _transcribeBasesMatrix[base] || base
}

// ### Get codon amino acid

// Takes an RNA codon and returns the translated amino acid.
//
//     bionode.getTranslatedAA("AUG");
//     => "M"
//     bionode.getTranslatedAA("GCU");
//     => "A"
//     bionode.getTranslatedAA("CUU");
//     => "L"
Bionode.prototype.getTranslatedAA = function(codon) {
  return _translateCodonsMatrix[codon]
}

// ### Remove introns

// Take a sequence and an array of exonsRanges and removes them.
//
//     bionode.removeIntrons("ATGACCCTGAAGGTGAATGACAG", [[1, 8]]);
//     => "TGACCCT"
//     bionode.removeIntrons("ATGACCCTGAAGGTGAATGACAG", [[2, 9], [12, 20]]);
//     => "GACCCTGGTGAATGA"
Bionode.prototype.removeIntrons = function(sequence, exonsRanges) {
  var sequenceWithoutIntrons = ''
  var exonsRangesSorted = exonsRanges.sort(function(a, b) { return a[0] - b[0] })
  exonsRangesSorted.forEach(function(exonRange) {
    sequenceWithoutIntrons += sequence.substring(exonRange[0], exonRange[1])
  })
  return sequenceWithoutIntrons
}

// ### Transcribe sequence

// Takes a sequence string and returns the transcribed sequence (dna <-> rna).
// If an array of exons is given, the introns will be removed from the sequence.
//
//     bionode.transcribe("ATGACCCTGAAGGTGAA");
//     => "AUGACCCUGAAGGUGAA"
//     bionode.transcribe("AUGACCCUGAAGGUGAA"); //reverse
//     => "ATGACCCTGAAGGTGAA"
Bionode.prototype.transcribe = function(sequence, exonsRanges) {
  if (exonsRanges) {
    var sequenceWithoutIntrons = bionode.removeIntrons(sequence, exonsRanges)
    sequence = sequenceWithoutIntrons
  }
  var sequenceType = bionode.checkSequenceType(sequence)
  if (sequenceType === 'dna' || sequenceType === 'ambiguousDna') {
    return sequence.replace(/t/g, 'u').replace(/T/g, 'U')
  }
  else if (sequenceType === 'rna' || sequenceType === 'ambiguousRna') {
    return sequence.replace(/u/g, 't').replace(/U/g, 'T')
  }
}

// ### Translate sequence

// Takes a DNA or RNA sequence and translates it to protein
// If an array of exons is given, the introns will be removed from the sequence.
//
//     bionode.translate("ATGACCCTGAAGGTGAATGACAGGAAGCCCAAC"); //dna
//     => "MTLKVNDRKPN"
//     bionode.translate("AUGACCCUGAAGGUGAAUGACAGGAAGCCCAAC"); //rna
//     => "MTLKVNDRKPN"
//     bionode.translate("ATGACCCTGAAGGTGAATGACAGGAAGCC", [[3, 21]]);
//     => "LKVND"
Bionode.prototype.translate = function(sequence, exonsRanges) {
  if (exonsRanges) {
    var sequenceWithoutIntrons = bionode.removeIntrons(sequence, exonsRanges)
    sequence = sequenceWithoutIntrons
  }
  var sequenceType = bionode.checkSequenceType(sequence)
  var rna
  if (sequenceType === 'protein') {
    return sequence
  }
  else if (sequenceType === 'dna' || sequenceType === 'ambiguousDna') {
    if (sequenceType === 'ambiguousDna') sequence.replace(/[wsmkrybdhv]/g, 'x').replace(/[WSMKRYBDHV]/g, 'X')
    rna = bionode.transcribe(sequence, exonsRanges)
  }
  else if (sequenceType === 'rna' || sequenceType === 'ambiguousRna') {
    if (sequenceType === 'ambiguousRna') sequence.replace(/[wsmkrybdhv]/g, 'x').replace(/[WSMKRYBDHV]/g, 'X')
    rna = sequence
  }
  return rna.match(/.{1,3}/g).map(bionode.getTranslatedAA).join('')
}

// ### Reverse exons

// Takes an array of exons and the length of the reference and returns inverted coordinates.
//
//     bionode.reverseExons([[2,8]], 20);
//     => [ [ 12, 18 ] ]
//     bionode.reverseExons([[10,45], [65,105]], 180);
//     => [ [ 135, 170 ], [ 75, 115 ] ]
Bionode.prototype.reverseExons = function(exonsRanges, referenceLength) {
  var reversedExonsRanges = []
  exonsRanges.forEach(function(exonRange) {
    var start = referenceLength - exonRange[1]
    var stop = referenceLength - exonRange[0]
    reversedExonsRanges.push([start, stop])
  })
  return reversedExonsRanges
}

// ### Find non-canonical splice sites

// Takes a sequence and exons ranges and returns an array of non canonical splice sites.
//
//     bionode.findNonCanonicalSplices("GGCGGCGGCGGTGAGGTGGACCTGCGCGAATACGTGGTCGCCCTGT", [[0, 10], [20, 30]]);
//     => [ 20 ]
//     bionode.findNonCanonicalSplices("GGCGGCGGCGGTGAGGTGAGCCTGCGCGAATACGTGGTCGCCCTGT", [[0, 10], [20, 30]]);
//     => []
Bionode.prototype.findNonCanonicalSplices = function(sequence, exonsRanges) {
  var nonCanonicalSplices = []
  var exonsRangesSorted = exonsRanges.sort(function(a, b) { return a[0] - b[0] })
  exonsRangesSorted.forEach(checkNonCanonicalIntron)
  function checkNonCanonicalIntron(exonRange, i) {
    var donor = exonRange
    var acceptor = exonsRangesSorted[i + 1]
    if (!acceptor) return null
    var intronRange = [donor[1], acceptor[0]]
    var intronStartBases = sequence.slice(intronRange[0], intronRange[0] + 2).toLowerCase().replace('t', 'u')
    var intronStopBases = sequence.slice(intronRange[1] - 2, intronRange[1]).toLowerCase()
    if (intronStartBases !== 'gu')
      nonCanonicalSplices.push(intronRange[0])
    if (intronStopBases !== 'ag')
      nonCanonicalSplices.push(intronRange[1])
  }
  return nonCanonicalSplices
}

// ### Check canonical translation start site

// Takes a sequence and returns boolean for canonical translation start site.
//
//     bionode.checkCanonicalTranslationStartSite("ATGACCCTGAAGGT");
//     => true
//     bionode.checkCanonicalTranslationStartSite("AATGACCCTGAAGGT");
//     => false
Bionode.prototype.checkCanonicalTranslationStartSite = function(sequence) {
  return sequence.substring(0, 3).toLowerCase().replace('t', 'u') === 'aug'
}

// ### Get reading frames

// Takes a sequence and returns an array with the six possible Reading Frames (+1, +2, +3, -1, -2, -3).
//
//     bionode.getReadingFrames("ATGACCCTGAAGGTGAATGACAGGAAGCCCAAC");
//     => [ 'ATGACCCTGAAGGTGAATGACAGGAAGCCCAAC',
//          'TGACCCTGAAGGTGAATGACAGGAAGCCCAAC',
//          'GACCCTGAAGGTGAATGACAGGAAGCCCAAC',
//          'GTTGGGCTTCCTGTCATTCACCTTCAGGGTCAT',
//          'TTGGGCTTCCTGTCATTCACCTTCAGGGTCAT',
//          'TGGGCTTCCTGTCATTCACCTTCAGGGTCAT' ]
Bionode.prototype.getReadingFrames = function(sequence) {
  var reverse = bionode.reverseComplement(sequence)
  return [sequence, sequence.substring(1), sequence.substring(2), reverse, reverse.substring(1), reverse.substring(2)]
}

// ### Get open reading frames

// Takes a Reading Frame sequence and returns an array of Open Reading Frames.
//
//     bionode.getOpenReadingFrames("ATGACCCTGAAGGTGAATGACAGGAAGCCCAAC");
//     => [ 'ATGACCCTGAAGGTGAATGACAGGAAGCCCAAC' ]
//     bionode.getOpenReadingFrames("AUGACCCUGAAGGUGAAUGACAGGAAGCCCAAC");
//     => [ 'AUGACCCUGAAGGUGAAUGACAGGAAGCCCAAC' ]
//     bionode.getOpenReadingFrames("ATGAGAAGCCCAACATGAGGACTGA");
//     => [ 'ATGAGAAGCCCAACATGA', 'GGACTGA' ]
Bionode.prototype.getOpenReadingFrames = function(sequence) {
  var sequenceType = bionode.checkSequenceType(sequence)
  var stopCodons
  if (sequenceType === 'dna' || sequenceType === 'ambiguousDna') {
    stopCodons = ['TAA', 'TGA', 'TAG', 'taa', 'tga', 'tag']
  }
  else if (sequenceType === 'rna' || sequenceType === 'ambiguousRna') {
    stopCodons = ['UAA', 'UGA', 'UAG', 'uaa', 'uga', 'uag']
  }
  var openReadingFrames = []
  var openReadingFrame = ''
  sequence.match(/.{1,3}/g).forEach(function(codon) {
    openReadingFrame += codon
    if (stopCodons.indexOf(codon) !== -1 && openReadingFrame.length > 0) {
      openReadingFrames.push(openReadingFrame)
      openReadingFrame = ''
    }
  })
  openReadingFrames.push(openReadingFrame)
  return openReadingFrames
}

// ### Get all open reading frames

// Takes a sequence and returns all Open Reading Frames in the six Reading Frames.
//
//     bionode.getAllOpenReadingFrames("ATGACCCTGAAGGTGAATGACA");
//     => [ [ 'ATGACCCTGAAGGTGAATGACA' ],
//          [ 'TGA', 'CCCTGA', 'AGGTGA', 'ATGACA' ],
//          [ 'GACCCTGAAGGTGAATGA', 'CA' ],
//          [ 'TGTCATTCACCTTCAGGGTCAT' ],
//          [ 'GTCATTCACCTTCAGGGTCAT' ],
//          [ 'TCATTCACCTTCAGGGTCAT' ] ]
Bionode.prototype.getAllOpenReadingFrames = function(sequence) {
  var readingFrames = bionode.getReadingFrames(sequence)
  var allOpenReadingFrames = readingFrames.map(bionode.getOpenReadingFrames)
  return allOpenReadingFrames
}

// ### Find longest open reading frame

// Takes a sequence and returns the longest ORF from all six reading frames and
// corresponding frame symbol (+1, +2, +3, -1, -2, -3). If a frame symbol is specified,
// only look for longest ORF on that frame.
// When sorting ORFs, if there's a tie, choose the one that starts with start codon Methionine.
// If there's still a tie, return one randomly.
//
//     bionode.findLongestOpenReadingFrame("ATGACCCTGAAGGTGAATGACA");
//     => [ 'ATGACCCTGAAGGTGAATGACA', '+1' ]
//     bionode.findLongestOpenReadingFrame("ATGACCCTGAAGGTGAATGACA", "-1");
//     => "TGTCATTCACCTTCAGGGTCAT"
Bionode.prototype.findLongestOpenReadingFrame = function(sequence, frameSymbol) {
  var frameSymbols = ['+1', '+2', '+3', '-1', '-2', '-3']
  if (frameSymbol) {
    var framePosition = frameSymbols.indexOf(frameSymbol)
    var readingFrame = bionode.getReadingFrames(sequence)[framePosition]
    var openReadingFrames = bionode.getOpenReadingFrames(readingFrame)
    var longestOpenReadingFrame = getLongestOpenReadingFrame(openReadingFrames)
    return longestOpenReadingFrame
  }
  else {
    // Get longest ORFs for all six possible reading frames
    var longestOpenReadingFrames = bionode.getAllOpenReadingFrames(sequence).map(getLongestOpenReadingFrame)
    // Get longest ORF
    var longestOpenReadingFrame = getLongestOpenReadingFrame(longestOpenReadingFrames.slice())
    var framePosition = longestOpenReadingFrames.indexOf(longestOpenReadingFrame)
    var frameSymbol = frameSymbols[framePosition]
    return [longestOpenReadingFrame, frameSymbol]
  }

  // Helper that sorts by length, giving priority to ones that start with ATG/AUG
  function sortReadingFrames(a, b) {
    var aSort = a.length
    var bSort = b.length
    if (bSort - aSort === 0) {
      var aStartCodon = a.slice(0, 3).toUpperCase().replace('T', 'U')
      var bStartCodon = b.slice(0, 3).toUpperCase().replace('T', 'U')
      if (aStartCodon === 'AUG') { aSort++ }
      if (bStartCodon === 'AUG') { bSort++ }
    }
    return bSort - aSort
  }

  // Helper that takes an array and returns longest Reading Frame
  function getLongestOpenReadingFrame(array) {
    return array.sort(sortReadingFrames)[0]
  }

}
