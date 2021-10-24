import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl'

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
      vertex: `
            attribute vec3 position;
    
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
    
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,
      fragment: `
            void main() {
                gl_FragColor = vec4(1.0);
            }
        `,
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
