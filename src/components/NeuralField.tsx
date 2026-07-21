import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Interactive neural-network particle field: drifting nodes with proximity
 * connections, gently repelled by the cursor. Additive glow on near-black.
 */
export default function NeuralField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current!
    const reduced = prefersReducedMotion()
    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 70 : 140
    const CONNECT_DIST = isMobile ? 1.5 : 1.7
    const MAX_SEGMENTS = COUNT * 10

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // World-space bounds visible at z=0
    const worldH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z
    const worldW = worldH * camera.aspect
    const BX = worldW * 0.62
    const BY = worldH * 0.62
    const BZ = 1.6

    // Soft round sprite for points
    const spriteCanvas = document.createElement('canvas')
    spriteCanvas.width = spriteCanvas.height = 64
    const ctx = spriteCanvas.getContext('2d')!
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(0.35, 'rgba(255,255,255,0.6)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const sprite = new THREE.CanvasTexture(spriteCanvas)

    const cyan = new THREE.Color('#38e1ff')
    const amber = new THREE.Color('#ffb454')

    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * BX
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * BY
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * BZ
      velocities[i * 3] = (Math.random() - 0.5) * 0.004
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
      const c = Math.random() < 0.82 ? cyan : amber
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.09,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    scene.add(new THREE.Points(pGeo, pMat))

    const lPositions = new Float32Array(MAX_SEGMENTS * 6)
    const lColors = new Float32Array(MAX_SEGMENTS * 6)
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPositions, 3))
    lGeo.setAttribute('color', new THREE.BufferAttribute(lColors, 3))
    const lMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const lines = new THREE.LineSegments(lGeo, lMat)
    scene.add(lines)

    const mouse = new THREE.Vector3(999, 999, 0)
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      mouse.set((nx * worldW) / 2, (ny * worldH) / 2, 0)
    }
    const onPointerLeave = () => mouse.set(999, 999, 0)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    let raf = 0
    let running = true

    const step = () => {
      const pos = pGeo.getAttribute('position') as THREE.BufferAttribute
      const arr = pos.array as Float32Array

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3
        arr[ix] += velocities[ix]
        arr[ix + 1] += velocities[ix + 1]
        arr[ix + 2] += velocities[ix + 2]

        // Cursor repulsion
        const dx = arr[ix] - mouse.x
        const dy = arr[ix + 1] - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 2.6) {
          const d = Math.sqrt(d2) || 0.001
          const f = ((1.62 - d) / 1.62) * 0.016
          if (f > 0) {
            arr[ix] += (dx / d) * f
            arr[ix + 1] += (dy / d) * f
          }
        }

        // Wrap bounds
        if (arr[ix] > BX) arr[ix] = -BX
        else if (arr[ix] < -BX) arr[ix] = BX
        if (arr[ix + 1] > BY) arr[ix + 1] = -BY
        else if (arr[ix + 1] < -BY) arr[ix + 1] = BY
        if (arr[ix + 2] > BZ) arr[ix + 2] = -BZ
        else if (arr[ix + 2] < -BZ) arr[ix + 2] = BZ
      }
      pos.needsUpdate = true

      // Rebuild connection segments
      let seg = 0
      for (let i = 0; i < COUNT && seg < MAX_SEGMENTS; i++) {
        for (let j = i + 1; j < COUNT && seg < MAX_SEGMENTS; j++) {
          const ix = i * 3
          const jx = j * 3
          const dx = arr[ix] - arr[jx]
          const dy = arr[ix + 1] - arr[jx + 1]
          const dz = arr[ix + 2] - arr[jx + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < CONNECT_DIST) {
            const fade = (1 - dist / CONNECT_DIST) * 0.7
            const s6 = seg * 6
            lPositions[s6] = arr[ix]
            lPositions[s6 + 1] = arr[ix + 1]
            lPositions[s6 + 2] = arr[ix + 2]
            lPositions[s6 + 3] = arr[jx]
            lPositions[s6 + 4] = arr[jx + 1]
            lPositions[s6 + 5] = arr[jx + 2]
            for (let k = 0; k < 2; k++) {
              const src = k === 0 ? i * 3 : j * 3
              lColors[s6 + k * 3] = colors[src] * fade
              lColors[s6 + k * 3 + 1] = colors[src + 1] * fade
              lColors[s6 + k * 3 + 2] = colors[src + 2] * fade
            }
            seg++
          }
        }
      }
      lGeo.setDrawRange(0, seg * 2)
      ;(lGeo.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
      ;(lGeo.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true

      renderer.render(scene, camera)
    }

    const animate = () => {
      if (!running) return
      step()
      raf = requestAnimationFrame(animate)
    }

    if (reduced) {
      step() // single static frame
    } else {
      animate()
    }

    // Pause when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return
        if (entry.isIntersecting && !running) {
          running = true
          animate()
        } else if (!entry.isIntersecting && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.02 },
    )
    io.observe(mount)

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      if (reduced) step()
    }
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      renderer.dispose()
      pGeo.dispose()
      lGeo.dispose()
      pMat.dispose()
      lMat.dispose()
      sprite.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} aria-hidden className="absolute inset-0" />
}
