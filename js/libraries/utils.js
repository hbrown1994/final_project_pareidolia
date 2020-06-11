//Utility FUNCTIONS____________________________________________________________________

//make an array of float32 values
function makeFloatArray(array) {
  let real = new Float32Array(array)
  let imag_array=[]
  for (var i = 0; i < array.length; i++) imag_array.push(0)
  let imag = new Float32Array(imag_array)
  return [real, imag]
}

//randomly shuffle an array
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
let nums =[], numsDiv =[], sum = 0
for (var i = 0; i < numVals; i++) {
  let atk = Math.random()
  nums.push(atk)
  sum = sum + atk
}
for (var i = 0; i < nums.length; i++) {
  let norm = (nums[i]/sum)*scale
  numsDiv.push(norm)
}
return numsDiv
}

//adsr envelops
function adsrExp (param, initVal, peak, val, t, a, d, s) {
  param.setValueAtTime(initVal, t)
  param.exponentialRampToValueAtTime(peak, t+a)
  param.exponentialRampToValueAtTime(val, t+a+d)
  param.exponentialRampToValueAtTime(val, t+a+d+s)
  //noFadeout
}
