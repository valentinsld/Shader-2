import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl'
import cubeVertex from '../shaders/cube.vert'
import cubeFragment from '../shaders/cube.frag'

class App {
  constructor() {
    this.renderer = new Renderer()
    this.gl = this.renderer.gl
    document.body.appendChild(this.gl.canvas)

    this.camera = new Camera(this.gl)
    this.camera.position.z = 5

    window.addEventListener('resize', this.resize, false)
    this.resize()

    this.initScene()
    this.initBox()

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

  update(t) {
    requestAnimationFrame(this.update.bind(this))

    this.mesh.rotation.y -= 0.04
    this.mesh.rotation.x += 0.03
    this.renderer.render({ scene: this.scene, camera: this.camera })
  }
}

export default App
