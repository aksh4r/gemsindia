'use client'
import { useEffect, useRef } from 'react'

interface Props {
  color: number
  shape?: 'octa' | 'ico'
  size?: number
  ior?: number
}

export default function GemOrb({ color, size = 90, ior = 1.7 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animId: number
    Promise.all([
      import('three'),
      import('three/addons/environments/RoomEnvironment.js'),
    ]).then(([THREE, { RoomEnvironment }]) => {
      const el = containerRef.current
      if (!el) return

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setSize(size, size)
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      el.appendChild(renderer.domElement)

      const pmrem = new THREE.PMREMGenerator(renderer)
      const envTexture = pmrem.fromScene(new RoomEnvironment()).texture
      pmrem.dispose()

      const scene = new THREE.Scene()
      scene.environment = envTexture

      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10)
      camera.position.z = 2.6

      scene.add(new THREE.AmbientLight(0xffffff, 0.25))
      const pl = new THREE.PointLight(0xffffff, 5, 8); pl.position.set(2, 2, 2); scene.add(pl)
      const pl2 = new THREE.PointLight(color, 2, 6); pl2.position.set(-1, -1, 1); scene.add(pl2)

      const r = 0.75
      const pts = [
        new THREE.Vector2(0.001 * r, -0.86 * r),
        new THREE.Vector2(0.72  * r, -0.20 * r),
        new THREE.Vector2(0.98  * r,  0.00 * r),
        new THREE.Vector2(0.95  * r,  0.04 * r),
        new THREE.Vector2(0.62  * r,  0.22 * r),
        new THREE.Vector2(0.50  * r,  0.38 * r),
        new THREE.Vector2(0.001 * r,  0.38 * r),
      ]
      const geo = new THREE.LatheGeometry(pts, 8)
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0,
        roughness: 0,
        transmission: 0.92,
        thickness: 1.2,
        ior,
        dispersion: 1.0,
        reflectivity: 1,
        envMapIntensity: 2.5,
        flatShading: true,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.y = Math.random() * Math.PI * 2
      scene.add(mesh)

      const anim = () => {
        animId = requestAnimationFrame(anim)
        mesh.rotation.x += 0.007
        mesh.rotation.y += 0.011
        renderer.render(scene, camera)
      }
      anim()

      return () => { el.removeChild(renderer.domElement) }
    })
    return () => cancelAnimationFrame(animId)
  }, [color, size, ior])

  return <div ref={containerRef} style={{ width: size, height: size }} />
}
