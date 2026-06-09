'use client'

import { useEffect, useState, useRef } from 'react'

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [gone, setGone] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    const phases = [
      { limit: 15, speed: 35 },
      { limit: 35, speed: 18 },
      { limit: 55, speed: 8 },
      { limit: 75, speed: 4 },
      { limit: 90, speed: 1.5 },
    ]
    let currentPhase = 0

    const tick = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        const phase = phases[Math.min(currentPhase, phases.length - 1)]
        const next = prev + phase.speed * (0.8 + Math.random() * 0.4)
        if (next >= phase.limit && currentPhase < phases.length - 1) {
          currentPhase++
        }
        return Math.min(next, 99.5)
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const onLoad = () => {
      cancelAnimationFrame(rafRef.current)
      let p = 99.5
      const fill = () => {
        p += (100 - p) * 0.3
        setProgress(Math.min(p, 100))
        if (p < 100) {
          requestAnimationFrame(fill)
        } else {
          setTimeout(() => {
            setExiting(true)
            setTimeout(() => setGone(true), 700)
          }, 350)
        }
      }
      requestAnimationFrame(fill)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none
        ${exiting ? 'page-loader--exit' : 'page-loader--entry'}`}
      style={{ backgroundColor: 'var(--surface-tint)' }}
    >
      <div className="flex flex-col items-center gap-10">
        <span
          className="font-[family-name:var(--font-bebas-neue)] text-5xl tracking-tighter"
          style={{ color: 'var(--primary)' }}
        >
          Mutugi
        </span>

        <div
          className="w-48 h-[2px] rounded-full overflow-hidden"
          style={{ backgroundColor: 'color-mix(in srgb, var(--on-surface-mute) 20%, transparent)' }}
        >
          <div
            className="h-full rounded-full transition-[width] duration-150 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: 'var(--accent)',
            }}
          />
        </div>

        <div className="flex items-baseline gap-1">
          <span
            className="font-[family-name:var(--font-plus-jakarta-sans)] text-5xl font-bold tracking-tighter"
            style={{ color: 'var(--on-surface)' }}
          >
            {Math.round(progress)}
          </span>
          <span
            className="font-[family-name:var(--font-plus-jakarta-sans)] text-5xl font-bold tracking-tighter"
            style={{ color: 'var(--accent)' }}
          >
            %
          </span>
        </div>
      </div>
    </div>
  )
}
