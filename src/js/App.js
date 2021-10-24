import { Renderer, Camera, Transform, Box, Program, Mesh, Orbit, Vec3 } from 'ogl'
import cubeVertex from '../shaders/cube.vert'
import cubeFragment from '../shaders/cube.frag'

import ShaderPlane from './ShaderPlane'

class App {
  constructor() {
    this.renderer = new Renderer()
    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)

    this.camera = new Camera(this.gl)
    this.camera.position.z = 5

    // Create controls and pass parameters
    this.controls = new Orbit(this.camera, {
      target: new Vec3(0, 0, 0),
    })

    this.initTime = new Date()

    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    this.initScene()
    // this.initBox()
    this.initShader()

    this.update()
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    })
  }

  initScene() {
    this.scene = new Transform()
  }

  initBox() {
    const geometry = new Box(this.gl)

    const program = new Program(this.gl, {
      vertex: cubeVertex,
      fragment: cubeFragment,
    })

    this.mesh = new Mesh(this.gl, { geometry, program })
    this.mesh.setParent(this.scene)
  }

  initShader() {
    this.shaderPlane = new ShaderPlane({
      gl: this.gl,
      scene: this.scene,
      camera: this.camera,
    })
  }

  update() {
    requestAnimationFrame(this.update.bind(this))
    const time = (new Date() - this.initTime) / 1000

    this.shaderPlane.update(time)

    // Need to update controls every frame
    this.controls.update()
    this.renderer.render({ scene: this.scene, camera: this.camera })
  }
}

export default App
