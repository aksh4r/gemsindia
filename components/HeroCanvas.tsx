'use client'
import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let THREE: typeof import('three')
    let animId: number

    import('three').then((mod) => {
      THREE = mod

      const canvas = canvasRef.current
      if (!canvas) return
      const parent = canvas.parentElement!

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
      camera.position.z = 7

      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const pl1 = new THREE.PointLight(0xC9272D, 4, 20); pl1.position.set(3, 3, 4); scene.add(pl1)
      const pl2 = new THREE.PointLight(0x1565C0, 3, 18); pl2.position.set(-3, 0, 3); scene.add(pl2)
      const pl3 = new THREE.PointLight(0xFFD700, 2, 15); pl3.position.set(0, 4, -2); scene.add(pl3)

      const configs = [
        { col: 0xC9272D, geo: 'octa', s: 1.1, x: 0,    y: 0.2,  z: 0 },
        { col: 0x1B5E20, geo: 'ico',  s: 0.55, x: 2.2,  y: 1.2,  z: 0.5 },
        { col: 0x1565C0, geo: 'octa', s: 0.45, x: -2,   y: -0.8, z: 0.3 },
        { col: 0x7B1FA2, geo: 'ico',  s: 0.38, x: 1.8,  y: -1.5, z: 0.2 },
        { col: 0xFFD700, geo: 'octa', s: 0.28, x: -1.5, y: 1.8,  z: -0.3 },
        { col: 0x0288D1, geo: 'ico',  s: 0.32, x: 0.5,  y: -2.2, z: 0.1 },
      ]

      const meshes = configs.map((c) => {
        const g = c.geo === 'ico'
          ? new THREE.IcosahedronGeometry(c.s, 0)
          : new THREE.OctahedronGeometry(c.s, 0)
        const mat = new THREE.MeshPhongMaterial({
          color: c.col,
          emissive: new THREE.Color(c.col).multiplyScalar(0.12),
          shininess: 350, transparent: true, opacity: 0.92,
        })
        const mesh = new THREE.Mesh(g, mat)
        mesh.position.set(c.x, c.y, c.z)
        ;(mesh as any).userData = { rx: (Math.random() - 0.5) * 0.012, ry: (Math.random() - 0.5) * 0.015, oy: c.y }
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
        pl1.position.y = 3 + Math.cos(t * 0.5) * 1
        renderer.render(scene, camera)
      }
      anim()

      return () => { window.removeEventListener('resize', resize) }
    })

    return () => { cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}
