/* eslint-disable import/extensions */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'

// import * as dat from 'dat.gui'
import ShaderPlane from './ShaderPlane'

class App {
  constructor() {
    // Debug
    // this.gui = new dat.GUI({ width: 340 })

    // Canvas
    this.canvas = document.querySelector('canvas.webgl')

    // Scene
    this.scene = new THREE.Scene()

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.initCamera()
    this.initRenderer()
    this.resize()

    this.initPlane()

    this.clock = new THREE.Clock()
    this.initEvents()
  }

  initPlane() {
    this.shaderPlane = new ShaderPlane({
      scene: this.scene,
    })
  }

  initCamera() {
    // Base camera
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
    this.camera.position.set(3, 3, 3)
    this.scene.add(this.camera)

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.maxPolarAngle = Math.PI * 0.495
    this.controls.minPolarAngle = Math.PI * 0.03
    this.controls.target.set(0, 0, 0)
    this.controls.minDistance = 2
    this.controls.maxDistance = 10
    this.controls.zoomSpeed = 0.5
    this.controls.panSpeed = 0.5
    this.controls.rotateSpeed = 0.5
    this.controls.update()
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // postprocessing
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.afterimagePass = new AfterimagePass()
    this.composer.addPass(this.afterimagePass)

    window.addEventListener('resize', this.resize.bind(this))

    if (typeof TESTING !== 'undefined') { for (let i = 0; i < 1; i++) { this.render() } }
  }

  //
  // Events
  //
  initEvents() {
    window.addEventListener('resize', this.resize.bind(this))

    this.update()
  }

  resize() {
    // Update sizes
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.composer.setSize(this.sizes.width, this.sizes.height)
    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  //
  // Update
  //
  update() {
    window.requestAnimationFrame(this.update.bind(this))

    const elapsedTime = this.clock.getElapsedTime()

    // Update controls
    this.controls.update()

    this.shaderPlane.update(elapsedTime)

    // Render
    this.render()
  }

  render() {
    // console.log(this.composer)
    this.composer.render()
  }
}

export default App
