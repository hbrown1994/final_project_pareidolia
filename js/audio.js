function audio(nums, numsNorm, numsNormBipolar, numsSplit, numsSplitNorm, numsSplitBipolar) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const time = ctx.currentTime

  //oscs, lvls, and pans
  let count, oscs = [], lvls = [], pans = [], panPos = [-1, 0, 1], arraySums = []
  panPos = shuffle(panPos)
  for (i = 0; i < numsSplit.length; i++) {
      oscs.push(new OscillatorNode(ctx))
      lvls.push(new GainNode(ctx, {gain:0.25}))
      pans.push(new PannerNode(ctx, {positionX: 0}))
  }

  /*___ Data -> Sound _______________________________________________________*/
  let firstWaveFormReal = [0]
  let firstWaveFormImag = []
  let waveForms = []

  //lengthen first array since it orginally contains only 2 valuess
  for (var i = 0; i < 30; i++) {
    let flip = i%2, odd = i%3
    if(odd === 2){firstWaveFormReal.push(numsSplitBipolar[0][flip]*-1)}
      else {firstWaveFormReal.push(numsSplitBipolar[0][flip])}
  }

  //Add extended first array
  waveForms.push(ctx.createPeriodicWave(
      makeFloatArray(firstWaveFormReal)[0],
      makeFloatArray(firstWaveFormReal)[1]
    )
  )

  //add the rest (thats why i=1 here)
  for (var i = 1; i < numsSplitBipolar.length; i++) {
    waveForms.push(
      ctx.createPeriodicWave(
        makeFloatArray(numsSplitBipolar[i])[0],
        makeFloatArray(numsSplitBipolar[i])[1]
      )
    )
  }

  //shuffle for variety
  waveForms = shuffle(waveForms)

  //calculate sum of items in an array
  for (var j = 0; j < numsSplit.length; j++) {
    let total = 0
    for (var i = 0; i < numsSplit[j].length; i++) {
      total = total + numsSplit[j][i]
    }
    arraySums.push(total)
  }

  //set totaltime for audio manipulations
  let totalTime = 0
  for (var i = 0; i < 7; i++) totalTime = totalTime + arraySums[i]
  totalTime = totalTime / 2

  runAudio()

  function runAudio() {
    for (var j = 0; j < waveForms.length; j++) {
      let scale = 5, add=40; //scale freqs, (add determines lowest pitch)

      //random octave scaler of 5 or 6
      scale = Math.round(Math.random())+5;

      oscs[j].connect(pans[j])
      pans[j].connect(lvls[j])
      lvls[j].connect(ctx.destination)

      //init synths & set freqs
      oscs[j].setPeriodicWave(waveForms[j])
      oscs[j].frequency.setValueAtTime(((numsSplit[j][0]*scale)+add), time)

      //set freq ramps from data arrays
      for (var i = 1; i < numsSplit[j].length; i++) {
        oscs[j].frequency.linearRampToValueAtTime(
          (numsSplit[j][i]*scale)+add,
          time + ((totalTime/numsSplit[j].length)*i)
        )
      }

      //set pans -> random/even across setero field
      if (j%3 === 1) panPos = shuffle(panPos)
      pans[j].setPosition(panPos[j%3],0,0)

      //set envelops
      let adsrArr = randomNumSum(3, totalTime)
      adsrExp(lvls[j].gain,0.000001,0.1,0.05,time,adsrArr[0]/4,adsrArr[1],adsrArr[2]*4)

      //start oscs
      oscs[j].start(ctx.currentTime ) // start now
      //no stop! funs forever
    }
  }
}
