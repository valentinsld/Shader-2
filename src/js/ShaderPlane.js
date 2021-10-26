import * as THREE from 'three'

class ShaderPlane {
  constructor({ scene }) {
    Object.assign(this, { scene })

    this.init()
  }

  init() {
    // Geometry
    const waterGeometry = new THREE.PlaneGeometry(2, 2, 128, 128)

    // Material
    const waterMaterial = new THREE.MeshBasicMaterial()

    // Mesh
    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.rotation.x = -Math.PI * 0.5
    this.scene.add(water)
  }
}

export default ShaderPlane
