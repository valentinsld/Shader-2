import { Plane, Mesh, Program, Vec2, Color } from 'ogl'

import fragment from '../shaders/plane.frag'
import vertex from '../shaders/plane.vert'

class ShaderPlane {
  constructor({ gl, scene, camera }) {
    this.gl = gl
    this.scene = scene
    this.camera = camera

    this.initPlane()

    console.log('init plane')
  }

  initPlane() {
    const planeGeometry = new Plane(this.gl)

    const program = new Program(this.gl, {
      vertex,
      fragment,

      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
        uResolution: { value: new Vec2(100, 100) },
      },

      // Don't cull faces so that plane is double sided - default is gl.BACK
      cullFace: null,
    })

    this.mesh = new Mesh(this.gl, { geometry: planeGeometry, program })

    // size plane
    const fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect

    this.mesh.scale.set(width, height, 1)

    this.mesh.setParent(this.scene)
  }

  update(t = 0) {
    console.log(t)
    this.mesh.program.uniforms.uTime.value = t
  }
}

export default ShaderPlane
