function getData(json) {
  let chars = [], c0 = ' '.charCodeAt(0),  cN = '~'.charCodeAt(0);
  for (; c0 <= cN; ++c0) {chars.push(String.fromCharCode(c0))}
  let nums=[], numsNorm=[], numsNormBipolar=[], numsSplit=[], numsSplitNorm = []
  let numsSplitBipolar = [], info = []

  //if can't access json, fill with Hunter's data
  if(json.code === 403){
    info = [ "US", "Illinois", "Chicago", "60290", "41.85003", "-87.65005", "-05:00", "73.44.30.245", "Comcast Cable Communications, LLC"]
  } else{
    info.push(json['location']['country'], json['location']['region'],
    json['location']['region'], json['location']['city'], json['location']['postalCode'],
    JSON.stringify(json['location']['lat']), JSON.stringify(json['location']['lng']),
    json['location']['timezone'], json['ip'], json['isp'])
  }

  //Make empty multi-dim arrays to fill w/nums
  for (var t = 0; t < info.length; t++){
    numsSplit.push([])
    numsSplitNorm.push([])
    numsSplitBipolar.push([0])
  }

  //Store char vaules into split arrays and normalize (bipolar and standard)
  for (var j = 0; j < info.length; j++) {
    for (var a = 0; a < info[j].length; a++) {
      for (var p = 0; p < chars.length; p++) {
       if (info[j][a] === chars[p]) {
         numsSplit[j].push(p) //split Nums
         numsSplitNorm[j].push(p/chars.length) //split nums 0.0-1.0
         if (chars[p] < (chars.length/2)) {numsSplitBipolar[j].push(p/chars.length)}
          else {numsSplitBipolar[j].push((p/chars.length) * -1)}
        }
      }
    }
  }

  //concat aboves arrays together into one array
  for (var y = 0; y < numsSplit.length; y++) {
    nums = nums.concat(numsSplit[y])
    numsNorm = numsNorm.concat(numsSplitNorm[y])
    numsNormBipolar = numsNormBipolar.concat(numsSplitBipolar[y])
  }

  //pass data into audio and visual modules
  audio(nums, numsNorm, numsNormBipolar, numsSplit, numsSplitNorm, numsSplitBipolar)
  visuals(nums, numsNorm, numsSplit, numsSplitNorm)
}
