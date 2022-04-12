// create the scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// save scene to 'cube' div
const cubeSection = document.querySelector('.cube')
cubeSection.appendChild(renderer.domElement)

// add ambient light
const ambient = new THREE.AmbientLight(0x222222)
scene.add(ambient)

// add directional light
const spotlight = new THREE.DirectionalLight(0xffffff)
spotlight.position.set(0, 0, 6)
scene.add(spotlight)

const geometry = new THREE.BoxGeometry(3, 3, 3)
const material = new THREE.MeshLambertMaterial({ color: 0x2727e6 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 6

// render the scene
function animate() {
  requestAnimationFrame(animate)

  // animate the scene
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
animate()
