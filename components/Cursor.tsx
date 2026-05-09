'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const ring = document.getElementById('cur-ring')
    if (!cur || !ring) return
    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cur.style.left = mx + 'px'; cur.style.top = my + 'px'
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div id="cur" className="cursor" />
      <div id="cur-ring" className="cursor-ring" />
    </>
  )
}
