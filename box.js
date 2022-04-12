// create the scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// add images to cube
const urls = [
  './images/brillo_side.png', './images/brillo_side.png', // x
  './images/brillo_side.png', './images/brillo_bottom.png', // y 
  './images/brillo_side.png', './images/brillo_side.png' // z
]

const loader = new THREE.TextureLoader()

const materials = urls.map(url => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(url)
  })
})

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
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

const boxSize = 3.75
const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize)

const cube = new THREE.Mesh(geometry, materials)
scene.add(cube)

camera.position.z = 6

// smooth graphics
let currentTimeline = window.pageYOffset / 3000 // how far down the page is scrolled as a percentage
let aimTimeline = window.pageYOffset / 3000

// render the scene
function animate() {
  requestAnimationFrame(animate)

  // animate the scene
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01

  currentTimeline += (aimTimeline - currentTimeline) * 0.2

  // const currentTimeline = Window.pageYOffset / 3000
  const rotationX = currentTimeline * -0.5 + 0.6
  const rotationY = (currentTimeline * 0.9 + 0.1) * Math.PI * 2 // 2 PI rotations is one complete circle

  cube.rotation.set(rotationX, rotationY, 0)
  renderer.render(scene, camera)
}
animate()

window.addEventListener('scroll', function() {
  aimTimeline = window.pageYOffset / 3000
})