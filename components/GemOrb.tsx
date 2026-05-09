'use client'
import { useEffect, useRef } from 'react'

interface Props {
  color: number
  shape?: 'octa' | 'ico'
  size?: number
}

export default function GemOrb({ color, shape = 'octa', size = 90 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animId: number
    import('three').then((THREE) => {
      const el = containerRef.current
      if (!el) return

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setSize(size, size)
      renderer.setClearColor(0x000000, 0)
      el.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10)
      camera.position.z = 2.6

      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const pl = new THREE.PointLight(0xffffff, 2.5, 8); pl.position.set(2, 2, 2); scene.add(pl)
      const pl2 = new THREE.PointLight(color, 2, 6); pl2.position.set(-1, -1, 1); scene.add(pl2)

      const geo = shape === 'ico'
        ? new THREE.IcosahedronGeometry(0.75, 0)
        : new THREE.OctahedronGeometry(0.75, 0)
      const mat = new THREE.MeshPhongMaterial({
        color, emissive: new THREE.Color(color).multiplyScalar(0.15),
        shininess: 400, transparent: true, opacity: 0.92,
      })
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)

      const anim = () => {
        animId = requestAnimationFrame(anim)
        mesh.rotation.x += 0.007; mesh.rotation.y += 0.011
        renderer.render(scene, camera)
      }
      anim()

      return () => { el.removeChild(renderer.domElement) }
    })
    return () => cancelAnimationFrame(animId)
  }, [color, shape, size])

  return <div ref={containerRef} style={{ width: size, height: size }} />
}
