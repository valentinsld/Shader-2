import * as THREE from 'three'

import vertexShader from '../shaders/ShaderPlane.vert'
import fragmentShader from '../shaders/ShaderPlane.frag'

class ShaderPlane {
  constructor({ scene }) {
    Object.assign(this, { scene })

    this.init()
  }

  init() {
    // Geometry
    const waterGeometry = new THREE.PlaneGeometry(5, 5, 2048 * 2, 2048 * 2)

    // Material
    const waterMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      // side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    })

    // Mesh
    this.mesh = new THREE.Mesh(waterGeometry, waterMaterial)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.scene.add(this.mesh)
  }

  //
  // Update
  //
  update(time) {
    this.mesh.material.uniforms.uTime.value = time / 10
  }
}

export default ShaderPlane
