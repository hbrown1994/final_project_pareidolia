function visuals(nums, numsNorm, numsSplit, numsSplitNorm) {
  let scene, renderer, camera, uniforms
  let chars = [], c0 = ' '.charCodeAt(0),  cN = '~'.charCodeAt(0)
  for (; c0 <= cN; ++c0) {chars.push(String.fromCharCode(c0))}
  let density = 0, density_d = 0.001
  let sat = 1000, sat_d = 0.1
  let detail = 10000, detail_d=0.1
  let noise_layer = 200, noise_layer_d=0.01
  let colorP = 1, colorP_d = 0.01

  uniforms = {
    "time": {value: 1.0 }, "flux": {value: 1.0}, "data0": {value: nums[5]}, "zoom": {value: numsNorm[10] + 1000},
    "data1": {value: nums[0] * 2}, "data2": {value: numsNorm[0]}, "data3":{value: numsNorm[1]},
    "data4": {value: nums[1]* 4}, "data5": {value: numsNorm[2]},"data6": {value: numsNorm[3]},
    "data7": {value: nums[2]* 2},"data8": {value: numsNorm[4]},"data9": {value: numsNorm[5]},
    "data10": {value: nums[3]},"data11": {value: numsNorm[6]},"data12": {value: nums[4]},"data13": {value: numsNorm[7]},
    "data14": {value: numsNorm[8] + 1},"data15": {value: numsNorm[9] + 1},
    "data17": {value: nums[5]},"data18": {value: nums[6]},
    "data19": {value: nums[7]},"data20": {value: nums[8]},
    "data21": {value: numsNorm[9] + 1},
    "data22": {value: numsNorm[10] + 1},  "data23": {value: numsNorm[11] + 6}, "data24": {value: numsNorm[12] + 7},
    "data25": {value: nums[9]}, "data26": {value: nums[10]},
    "data27": {value: nums[11]}, "data28": {value: nums[12]}, "data29": {value: nums[13]},
    "data30": {value: 2.3}, "data31": {value: nums[15] + 100}, "data32": {value: 1000.0},
    "data33": {value: 0.3}, "data34": {value: 1.0}, "data35": {value: 0.4},
    "data36": {value: 6.6}, "data37": {value: 200.0}, "data38": {value: 7.0},
    "data39": {value: nums[14]}, "data40": {value: numsNorm[15]},
    "data41": {value: 50},
    "data42": {value: 800.0}, "data43": {value: 200},
    "data44": {value: nums[17]}, "data45": {value: nums[16]},
    "data46": {value: numsNorm[13]}, "data47": {value: nums[24]},
    "data48": {value: nums[18]}, "data49": {value: numsNorm[13] + 1},
    "data50": {value: nums[21]}, "data51": {value: nums[20]},
    "data52": {value: nums[19]}, "data53": {value: nums[22]},
    "data54": {value: nums[23]}
  }

  init()
  animate()

  function init() {
    const container = document.getElementById('container')
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    camera.zoom = 1000.1
    scene = new THREE.Scene()

    const geometry = new THREE.PlaneBufferGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(devicePixelRatio)
    container.appendChild(renderer.domElement)
    onWindowResize()
    window.addEventListener('resize', onWindowResize, false)
  }

  function onWindowResize(){renderer.setSize(innerWidth, innerHeight)}

  function animate(timestamp) {
    requestAnimationFrame(animate)

    uniforms[ "zoom" ].value = (1000 / (timestamp/100)) * 7

    detail = detail - detail_d
    if(detail<1){detail_d=0}else{detail_d=1}
    uniforms[ "data32" ].value = detail

    sat = sat - sat_d
    if(sat<=1){sat_d=0.0} else{sat_d=0.5}
    uniforms[ "data33" ].value = sat

    noise_layer = noise_layer - noise_layer_d
    if(noise_layer<1){noise_layer_d=0} else{noise_layer_d=0.025}
    uniforms[ "data43" ].value = noise_layer

    if(colorP>(numsNorm[16] * 300)){colorP_d=0.0} else{colorP_d=0.01}
    uniforms[ "data41" ].value = colorP

    density = density + density_d
    if(density<7.0) {density_d=0} else{density_d=0.001}
    uniforms[ "data38" ].value = density

    uniforms[ "time" ].value = timestamp / 1000
    renderer.render( scene, camera )
  }
}
