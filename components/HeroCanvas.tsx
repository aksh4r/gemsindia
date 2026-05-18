'use client'
import { useEffect, useRef } from 'react'

// Brilliant-cut profile: (radius, y) rotated 8 times around Y axis.
// Last two points share the same y → LatheGeometry creates flat triangle fan = table face.
function makeGemGeo(THREE: typeof import('three'), r: number) {
  const pts = [
    new THREE.Vector2(0.001 * r, -0.86 * r), // culet
    new THREE.Vector2(0.72  * r, -0.20 * r), // lower pavilion
    new THREE.Vector2(0.98  * r,  0.00 * r), // girdle
    new THREE.Vector2(0.95  * r,  0.04 * r), // girdle top
    new THREE.Vector2(0.62  * r,  0.22 * r), // lower crown
    new THREE.Vector2(0.50  * r,  0.38 * r), // table rim
    new THREE.Vector2(0.001 * r,  0.38 * r), // table center → flat top face
  ]
  return new THREE.LatheGeometry(pts, 8)
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animId: number

    Promise.all([
      import('three'),
      import('three/addons/environments/RoomEnvironment.js'),
    ]).then(([THREE, { RoomEnvironment }]) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const parent = canvas.parentElement!

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2

      const pmrem = new THREE.PMREMGenerator(renderer)
      const envTexture = pmrem.fromScene(new RoomEnvironment()).texture
      pmrem.dispose()

      const scene = new THREE.Scene()
      scene.environment = envTexture

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
      camera.position.z = 7

      scene.add(new THREE.AmbientLight(0xffffff, 0.25))
      const pl1 = new THREE.PointLight(0xfff8e7, 10, 22); pl1.position.set(3, 4, 5); scene.add(pl1)
      const pl2 = new THREE.PointLight(0xddeeff,  6, 20); pl2.position.set(-4, 0, 3); scene.add(pl2)
      const pl3 = new THREE.PointLight(0xffffff,  4, 16); pl3.position.set(0, 5, -2); scene.add(pl3)

      const configs = [
        { col: 0xBB0A1E, s: 1.1,  x:  0.0, y:  0.2, z:  0.0, ior: 1.77, disp: 1.2 }, // Ruby
        { col: 0x0A6E2A, s: 0.60, x:  2.2, y:  1.2, z:  0.5, ior: 1.58, disp: 0.9 }, // Emerald
        { col: 0x0C3D8A, s: 0.50, x: -2.0, y: -0.8, z:  0.3, ior: 1.77, disp: 1.4 }, // Sapphire
        { col: 0x6A0DAD, s: 0.42, x:  1.8, y: -1.5, z:  0.2, ior: 1.54, disp: 0.8 }, // Amethyst
        { col: 0xC9A800, s: 0.30, x: -1.5, y:  1.8, z: -0.3, ior: 1.62, disp: 1.0 }, // Topaz
        { col: 0x0093A7, s: 0.35, x:  0.5, y: -2.2, z:  0.1, ior: 1.58, disp: 0.9 }, // Aquamarine
      ]

      const meshes = configs.map((c) => {
        const geo = makeGemGeo(THREE, c.s)
        const mat = new THREE.MeshPhysicalMaterial({
          color: c.col,
          metalness: 0,
          roughness: 0,
          transmission: 0.92,
          thickness: c.s * 2.5,
          ior: c.ior,
          dispersion: c.disp,
          reflectivity: 1,
          envMapIntensity: 3,
          flatShading: true,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(c.x, c.y, c.z)
        mesh.rotation.y = Math.random() * Math.PI * 2
        ;(mesh as any).userData = {
          rx: (Math.random() - 0.5) * 0.010,
          ry: (Math.random() - 0.5) * 0.014,
          oy: c.y,
        }
        scene.add(mesh)
        return mesh
      })

      const resize = () => {
        const w = parent.clientWidth, h = parent.clientHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      resize()
      window.addEventListener('resize', resize)

      let t = 0
      const anim = () => {
        animId = requestAnimationFrame(anim)
        t += 0.01
        meshes.forEach((m, i) => {
          m.rotation.x += m.userData.rx
          m.rotation.y += m.userData.ry
          m.position.y = m.userData.oy + Math.sin(t + i * 1.3) * 0.12
        })
        pl1.position.x = 3 + Math.sin(t * 0.7) * 1.5
        pl1.position.y = 4 + Math.cos(t * 0.5) * 1
        renderer.render(scene, camera)
      }
      anim()

      return () => { window.removeEventListener('resize', resize) }
    })

    return () => { cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}
