module.exports = new Bionode()

function Bionode() {}

// Create matrices for converting between genetic code bases.
var _baseMatrix = { A: 'T', C: 'G' }

var _dnaComplementBasesMatrix = Object.create(_baseMatrix)
var _rnaComplementBasesMatrix = Object.create(_baseMatrix)
var _transcribeBasesMatrix = Object.create(_baseMatrix)

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
    u: 'rna'
  }
  var matchBase = sequence.toLowerCase().match(/t|u/)[0]
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
  var sequenceType = this.checkSequenceType(sequence)
  var getComplementBase = this.createComplementBase(sequenceType)
  if (reverse) {
    return sequence.split('').reverse().map(getComplementBase).join('')
  }
  else {
    return sequence.split('').map(getComplementBase).join('')
  }
}

// Takes a sequence string and returns the reverse complement (syntax sugar).
Bionode.prototype.reverseComplement = function(sequence) {
  return this.complement(sequence, true)
}

// Takes a base character and returns the transcript base.
Bionode.prototype.getTranscribeBase = function(base) {
  return _transcribeBasesMatrix[base] || base
}

// Takes a sequence string and returns the transcribed sequence (dna <-> rna).
// If an array of exons is given, they will be removed from the sequence.
Bionode.prototype.transcribe = function(sequence, exonsRanges) {
  if (exonsRanges) {
    var sequenceWithoutExons = ''
    var exonsRangesSorted = exonsRanges.sort(function(a, b) { return a[0] - b[0] })
    exonsRangesSorted.forEach(function(exonRange) {
      sequenceWithoutExons += sequence.substring(exonRange[0], exonRange[1])
    })
    sequence = sequenceWithoutExons
  }
  return sequence.split('').map(this.getTranscribeBase).join('')
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
