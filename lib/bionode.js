module.exports = exports = bionode = new Bionode()

function Bionode() {}

// Create matrices for converting between genetic code bases.
var _baseMatrix = { A: 'T', C: 'G' }

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
  'GUG': 'V', 'UAA': '*', 'UGA': '*', 'UAG': '*', 'gcu': 'a', 'gcc': 'a',
  'gca': 'a', 'gcg': 'a', 'cgu': 'r', 'cgc': 'r', 'cga': 'r', 'cgg': 'r',
  'aga': 'r', 'agg': 'r', 'aau': 'n', 'aac': 'n', 'gau': 'd', 'gac': 'd',
  'ugu': 'c', 'ugc': 'c', 'caa': 'q', 'cag': 'q', 'gaa': 'e', 'gag': 'e',
  'ggu': 'g', 'ggc': 'g', 'gga': 'g', 'ggg': 'g', 'cau': 'h', 'cac': 'h',
  'auu': 'i', 'auc': 'i', 'aua': 'i', 'uua': 'l', 'uug': 'l', 'cuu': 'l',
  'cuc': 'l', 'cua': 'l', 'cug': 'l', 'aaa': 'k', 'aag': 'k', 'aug': 'm',
  'uuu': 'f', 'uuc': 'f', 'ccu': 'p', 'ccc': 'p', 'cca': 'p', 'ccg': 'p',
  'ucu': 's', 'ucc': 's', 'uca': 's', 'ucg': 's', 'agu': 's', 'agc': 's',
  'acu': 't', 'acc': 't', 'aca': 't', 'acg': 't', 'ugg': 'w', 'uau': 'y',
  'uac': 'y', 'guu': 'v', 'guc': 'v', 'gua': 'v', 'gug': 'v', 'uaa': '*',
  'uga': '*', 'uag': '*'
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


// Takes a sequence and quickly checks if it's dna or rna. Doesn't check for mixing errors.
Bionode.prototype.checkSequenceType = function(sequence) {
  var sequenceTypes = {
    t: 'dna',
    T: 'dna',
    u: 'rna',
    U: 'rna'
  }
  var matchBase = sequence.match(/t|T|u|U/)[0]
  var sequenceType = sequenceTypes[matchBase]
  return sequenceType
}

// Takes a sequence type argument and returns a function to complement bases.
Bionode.prototype.createComplementBase = function(sequenceType) {
  var complementBasesMatrix = sequenceType === 'rna' ? _rnaComplementBasesMatrix : _dnaComplementBasesMatrix
  var getComplementBase = function(base) {
    var complement = complementBasesMatrix[base]
    return complement || base
  }
  return getComplementBase
}

// Takes sequence string and returns the reverse sequence.
Bionode.prototype.reverse = function(sequence) {
  return sequence.split('').reverse().join('')
}

// Takes a sequence string and optional boolean for reverse, and returns it's complement.
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

// Takes a base character and returns the transcript base.
Bionode.prototype.getTranscribedBase = function(base) {
  return _transcribeBasesMatrix[base] || base
}

// Takes an RNA codon and returns the translated amino acid.
Bionode.prototype.getTranslatedAA = function(codon) {
  return _translateCodonsMatrix[codon]
}

// Take a sequence and an array of exonsRanges and removes them.
Bionode.prototype.removeIntrons = function(sequence, exonsRanges) {
  var sequenceWithoutIntrons = ''
  var exonsRangesSorted = exonsRanges.sort(function(a, b) { return a[0] - b[0] })
  exonsRangesSorted.forEach(function(exonRange) {
    sequenceWithoutIntrons += sequence.substring(exonRange[0], exonRange[1])
  })
  return sequenceWithoutIntrons
}

// Takes a sequence string and returns the transcribed sequence (dna <-> rna).
// If an array of exons is given, the introns will be removed from the sequence.
Bionode.prototype.transcribe = function(sequence, exonsRanges) {
  if (exonsRanges) {
    var sequenceWithoutIntrons = bionode.removeIntrons(sequence, exonsRanges)
    sequence = sequenceWithoutIntrons
  }
  var sequenceType = bionode.checkSequenceType(sequence)
  if (sequenceType === 'dna') {
    return sequence.replace(/t/g, 'u').replace(/T/g, 'U')
  }
  else if (sequenceType === 'rna') {
    return sequence.replace(/u/g, 't').replace(/U/g, 'T')
  }
}

// Takes a DNA or RNA sequence and translates it to protein
// If an array of exons is given, the introns will be removed from the sequence.
Bionode.prototype.translate = function(sequence, exonsRanges) {
  if (exonsRanges) {
    var sequenceWithoutIntrons = bionode.removeIntrons(sequence, exonsRanges)
    sequence = sequenceWithoutIntrons
  }
  var sequenceType = bionode.checkSequenceType(sequence)
  var rna
  if (sequenceType === 'dna') {
    rna = bionode.transcribe(sequence, exonsRanges)
  }
  else if (sequenceType === 'rna') {
    rna = sequence
  }
  return rna.match(/.{1,3}/g).map(bionode.getTranslatedAA).join('')
}

// Takes an array of exons and the length of the reference and returns inverted coordinates.
Bionode.prototype.reverseExons = function(exonsRanges, referenceLength) {
  var reversedExonsRanges = []
  exonsRanges.forEach(function(exonRange) {
    var start = referenceLength - exonRange[1]
    var stop = referenceLength - exonRange[0]
    reversedExonsRanges.push([start, stop])
  })
  return reversedExonsRanges
}

// Takes a sequence and exons ranges and returns an array of non canonical splice sites.
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

// Takes a sequence and returns boolean for canonical translation start site.
Bionode.prototype.checkCanonicalTranslationStartSite = function(sequence) {
  return sequence.substring(0, 3).toLowerCase().replace('t', 'u') === 'aug'
}

// Takes a sequence and returns an array with the six possible Reading Frames (+1, +2, +3, -1, -2, -3).
Bionode.prototype.getReadingFrames = function(sequence) {
  var reverse = bionode.reverseComplement(sequence)
  return [sequence, sequence.substring(1), sequence.substring(2), reverse, reverse.substring(1), reverse.substring(2)]
}

// Takes a Reading Frame sequence and returns an array of Open Reading Frames.
Bionode.prototype.getOpenReadingFrames = function(sequence) {
  var sequenceType = bionode.checkSequenceType(sequence)
  var stopCodons
  if (sequenceType === 'dna') {
    stopCodons = ['TAA', 'TGA', 'TAG', 'taa', 'tga', 'tag']
  }
  else if (sequenceType === 'rna') {
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

// Takes a sequence and returns all Open Reading Frames in the six Reading Frames.
Bionode.prototype.getAllOpenReadingFrames = function(sequence) {
  var readingFrames = bionode.getReadingFrames(sequence)
  var allOpenReadingFrames = readingFrames.map(bionode.getOpenReadingFrames)
  return allOpenReadingFrames
}

// Takes a sequence and returns the longest ORF
// If there's a tie, choose the one that starts with Methionine
// If there's still a tie, return one randomly
Bionode.prototype.findLongestOpenReadingFrame = function(sequence) {
  var longestOpenReadingFrame = bionode.getAllOpenReadingFrames(sequence)
  .map(getLongest)
  .sort(sortReadingFrame)[0]

  // Helper that sorts by length, giving priority to ones that start with ATG/AUG
  function sortReadingFrame(a, b) {
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
  function getLongest(array) {
    return array.sort(sortReadingFrame)[0]
  }

  return longestOpenReadingFrame
}
