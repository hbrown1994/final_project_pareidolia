//Utility FUNCTIONS____________________________________________________________________
function makeFloatArray(array) {
  let real = new Float32Array(array)
  let imag_array=[]
  for (var i = 0; i < array.length; i++) imag_array.push(0)
  let imag = new Float32Array(imag_array)
  return [real, imag]
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//make array of random numbers that equal a given sum
function randomNumSum(numVals, scale) {
let atks =[], atksDiv =[], sum = 0
for (var i = 0; i < numVals; i++) {
  let atk = Math.random()
  atks.push(atk)
  sum = sum + atk
}
for (var i = 0; i < atks.length; i++) {
  let norm = (atks[i]/sum)*scale
  atksDiv.push(norm)
}
return atksDiv
}
