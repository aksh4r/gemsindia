'use client'
import { useEffect, useRef } from 'react'

export default function AboutCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animId: number
    import('three').then((THREE) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const p = canvas.parentElement!
      const W = p.clientWidth || 400, H = p.clientHeight || 500
      canvas.width = W; canvas.height = H

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(W, H)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 30)
      camera.position.z = 5

      scene.add(new THREE.AmbientLight(0xffffff, 0.3))
      const pl1 = new THREE.PointLight(0xC9272D, 5, 20); pl1.position.set(3, 4, 4); scene.add(pl1)
      const pl2 = new THREE.PointLight(0x1565C0, 3, 15); pl2.position.set(-3, -2, 3); scene.add(pl2)
      const pl3 = new THREE.PointLight(0xFFD700, 2, 12); pl3.position.set(0, 3, -3); scene.add(pl3)

      const geo1 = new THREE.OctahedronGeometry(1.4, 0)
      const mat1 = new THREE.MeshPhongMaterial({ color: 0xC9272D, emissive: 0x180000, shininess: 500, transparent: true, opacity: 0.9 })
      const m1 = new THREE.Mesh(geo1, mat1); scene.add(m1)

      const geo2 = new THREE.IcosahedronGeometry(0.8, 1)
      const mat2 = new THREE.MeshPhongMaterial({ color: 0x1B5E20, emissive: 0x000800, shininess: 200, transparent: true, opacity: 0.45, wireframe: true })
      const m2 = new THREE.Mesh(geo2, mat2); scene.add(m2)

      const anim = () => {
        animId = requestAnimationFrame(anim)
        m1.rotation.x += 0.005; m1.rotation.y += 0.008
        m2.rotation.x -= 0.004; m2.rotation.y += 0.006
        pl1.position.x = 3 + Math.sin(Date.now() * 0.001) * 2
        pl1.position.y = 4 + Math.cos(Date.now() * 0.0008) * 2
        renderer.render(scene, camera)
      }
      anim()
    })
    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}
