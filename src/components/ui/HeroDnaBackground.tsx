import { useEffect, useRef } from 'react'

type HeroDnaBackgroundProps = {
  theme?: 'light' | 'dark' | 'cream'
}

const VIEW_WIDTH = 1440
const VIEW_HEIGHT = 390
const TURNS = 1.45
const RADIUS = 113
const STEPS = 168
const RUNG_COUNT = 26
const PERSPECTIVE = 920
/** Extra helix length off-screen - more on the right so it continues past the viewport */
const EDGE_BLEED_LEFT = 0.34
const EDGE_BLEED_RIGHT = 0.62
const HORIZONTAL_WIDTH_SCALE = 1.22
const HORIZONTAL_ANCHOR = 0.505
const RUNG_OPACITY = 0.15
const RUNG_STROKE_WIDTH = 8
const MIN_RUNG_LENGTH = 57
const HELIX_ROTATION_PERIOD = 138.9
const HELIX_WOBBLE_SPEED = 0.169
const HELIX_WOBBLE_SPEED_SLOW = 0.06
const HELIX_PHASE_SPEED = 0.12

const HELIX_GRADIENTS = {
  light: [
    { offset: '0%', color: '#5B8FD4' },
    { offset: '22%', color: '#52B888' },
    { offset: '44%', color: '#C9B84E' },
    { offset: '66%', color: '#9B72C4' },
    { offset: '88%', color: '#D47BA8' },
    { offset: '100%', color: '#5B8FD4' },
  ],
  cream: [
    { offset: '0%', color: '#5688C8' },
    { offset: '22%', color: '#4AAB7E' },
    { offset: '44%', color: '#BFAE48' },
    { offset: '66%', color: '#9168B8' },
    { offset: '88%', color: '#C8729E' },
    { offset: '100%', color: '#5688C8' },
  ],
  dark: [
    { offset: '0%', color: '#8EB8E8' },
    { offset: '22%', color: '#7DD4A8' },
    { offset: '44%', color: '#E8D878' },
    { offset: '66%', color: '#C09AE8' },
    { offset: '88%', color: '#E898C4' },
    { offset: '100%', color: '#8EB8E8' },
  ],
} as const

type ProjectedPoint = {
  sx: number
  sy: number
  depth: number
}

function projectPoint(
  x: number,
  y: number,
  z: number,
  rotX: number,
  rotY: number,
): ProjectedPoint {
  const cx = VIEW_WIDTH / 2
  const cy = VIEW_HEIGHT / 2

  let lx = x - cx
  let ly = y - cy
  let lz = z

  const cosX = Math.cos(rotX)
  const sinX = Math.sin(rotX)
  const ry = ly * cosX - lz * sinX
  const rz = ly * sinX + lz * cosX
  ly = ry
  lz = rz

  const cosY = Math.cos(rotY)
  const sinY = Math.sin(rotY)
  const rx = lx * cosY + lz * sinY
  lz = -lx * sinY + lz * cosY
  lx = rx

  const scale = PERSPECTIVE / (PERSPECTIVE + lz)

  return {
    sx: cx + lx * scale,
    sy: cy + ly * scale,
    depth: lz,
  }
}

function helixPoint(progress: number, phase: number, strandOffset: number) {
  const x = progress * VIEW_WIDTH
  const angle = progress * TURNS * Math.PI * 2 + phase + strandOffset
  const y = VIEW_HEIGHT / 2 + RADIUS * Math.cos(angle)
  const z = RADIUS * Math.sin(angle)

  return { x, y, z, angle }
}

function rungSegment(a: ProjectedPoint, b: ProjectedPoint): [ProjectedPoint, ProjectedPoint] {
  const dx = b.sx - a.sx
  const dy = b.sy - a.sy
  const length = Math.hypot(dx, dy)

  if (length >= MIN_RUNG_LENGTH) {
    return [a, b]
  }

  const midX = (a.sx + b.sx) / 2
  const midY = (a.sy + b.sy) / 2
  const avgDepth = (a.depth + b.depth) / 2

  if (length < 0.5) {
    return [
      { sx: midX, sy: midY - MIN_RUNG_LENGTH / 2, depth: avgDepth },
      { sx: midX, sy: midY + MIN_RUNG_LENGTH / 2, depth: avgDepth },
    ]
  }

  const scale = MIN_RUNG_LENGTH / length / 2

  return [
    { sx: midX - dx * scale, sy: midY - dy * scale, depth: a.depth },
    { sx: midX + dx * scale, sy: midY + dy * scale, depth: b.depth },
  ]
}

type HelixFrame = {
  rungs: { d: string; opacity: number; depth: number }[]
  nodes: { cx: number; cy: number; opacity: number; depth: number }[]
}

function fitHorizontalSpan(points: ProjectedPoint[]) {
  if (points.length === 0) {
    return
  }

  let minX = Infinity
  let maxX = -Infinity

  for (const point of points) {
    minX = Math.min(minX, point.sx)
    maxX = Math.max(maxX, point.sx)
  }

  const span = maxX - minX
  if (span <= 0) {
    return
  }

  const scale = (VIEW_WIDTH * HORIZONTAL_WIDTH_SCALE) / span
  const midX = (minX + maxX) / 2
  const anchorX = VIEW_WIDTH * HORIZONTAL_ANCHOR

  for (const point of points) {
    point.sx = anchorX + (point.sx - midX) * scale
  }
}

function buildHelixFrame(rotX: number, rotY: number, phase: number): HelixFrame {
  const startProgress = -EDGE_BLEED_LEFT
  const endProgress = 1 + EDGE_BLEED_RIGHT
  const layoutPoints: ProjectedPoint[] = []
  const rungPairs: [ProjectedPoint, ProjectedPoint][] = []

  for (let index = 0; index <= STEPS; index += 1) {
    const progress = startProgress + (index / STEPS) * (endProgress - startProgress)
    const pointA = helixPoint(progress, phase, 0)
    const pointB = helixPoint(progress, phase, Math.PI)

    layoutPoints.push(
      projectPoint(pointA.x, pointA.y, pointA.z, rotX, rotY),
      projectPoint(pointB.x, pointB.y, pointB.z, rotX, rotY),
    )
  }

  for (let index = 0; index < RUNG_COUNT; index += 1) {
    const progress = startProgress + ((index + 0.5) / RUNG_COUNT) * (endProgress - startProgress)
    const pointA = helixPoint(progress, phase, 0)
    const pointB = helixPoint(progress, phase, Math.PI)
    const projectedA = projectPoint(pointA.x, pointA.y, pointA.z, rotX, rotY)
    const projectedB = projectPoint(pointB.x, pointB.y, pointB.z, rotX, rotY)

    layoutPoints.push(projectedA, projectedB)
    rungPairs.push([projectedA, projectedB])
  }

  fitHorizontalSpan(layoutPoints)

  const rungs: HelixFrame['rungs'] = []
  const nodes: HelixFrame['nodes'] = []

  for (const [projectedA, projectedB] of rungPairs) {
    const [start, end] = rungSegment(projectedA, projectedB)
    const avgDepth = (start.depth + end.depth) / 2

    rungs.push({
      d: `M ${start.sx.toFixed(2)} ${start.sy.toFixed(2)} L ${end.sx.toFixed(2)} ${end.sy.toFixed(2)}`,
      opacity: RUNG_OPACITY,
      depth: avgDepth,
    })

    nodes.push(
      { cx: start.sx, cy: start.sy, opacity: RUNG_OPACITY, depth: start.depth },
      { cx: end.sx, cy: end.sy, opacity: RUNG_OPACITY, depth: end.depth },
    )
  }

  rungs.sort((a, b) => a.depth - b.depth)
  nodes.sort((a, b) => a.depth - b.depth)

  return { rungs, nodes }
}

export function HeroDnaBackground({ theme = 'light' }: HeroDnaBackgroundProps) {
  const gradientId = `hero-dna-gradient-${theme}`
  const gradientStroke = `url(#${gradientId})`
  const gradientStops = HELIX_GRADIENTS[theme]
  const wash =
    theme === 'dark'
      ? 'from-ink via-transparent to-ink'
      : theme === 'cream'
        ? 'from-cream-dark via-transparent to-cream-dark'
        : 'from-cream via-transparent to-cream'

  const rungsRef = useRef<SVGGElement>(null)
  const nodesRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let frameId = 0

    const render = (now: number) => {
      const elapsed = (now - start) / 1000
      const rotX = elapsed * ((Math.PI * 2) / HELIX_ROTATION_PERIOD)
      const rotY =
        Math.sin(elapsed * HELIX_WOBBLE_SPEED) * 0.18 +
        Math.sin(elapsed * HELIX_WOBBLE_SPEED_SLOW) * 0.08
      const phase = elapsed * HELIX_PHASE_SPEED
      const frame = buildHelixFrame(rotX, rotY, phase)

      if (rungsRef.current) {
        rungsRef.current.innerHTML = frame.rungs
          .map(
            (rung) =>
              `<path d="${rung.d}" stroke="${gradientStroke}" stroke-opacity="${rung.opacity.toFixed(3)}" stroke-width="${RUNG_STROKE_WIDTH}" stroke-linecap="round" vector-effect="non-scaling-stroke" fill="none" />`,
          )
          .join('')
      }

      if (nodesRef.current) {
        nodesRef.current.innerHTML = frame.nodes
          .map(
            (node) =>
              `<circle cx="${node.cx.toFixed(2)}" cy="${node.cy.toFixed(2)}" r="3.5" fill="${gradientStroke}" fill-opacity="${node.opacity.toFixed(3)}" />`,
          )
          .join('')
      }

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(render)
      }
    }

    render(start)

    return () => window.cancelAnimationFrame(frameId)
  }, [gradientStroke])

  return (
    <div className="hero-dna-bg" aria-hidden>
      <div className="hero-dna-scene">
        <div className="hero-dna-rotator">
          <svg
            className="hero-dna-svg"
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            preserveAspectRatio="none"
            overflow="visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1={-VIEW_WIDTH * EDGE_BLEED_LEFT}
                y1={VIEW_HEIGHT / 2}
                x2={VIEW_WIDTH * (1 + EDGE_BLEED_RIGHT)}
                y2={VIEW_HEIGHT / 2}
              >
                {gradientStops.map((stop) => (
                  <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
            <g ref={nodesRef} />
            <g ref={rungsRef} />
          </svg>
        </div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-b ${wash} opacity-72`} />
    </div>
  )
}

/** @deprecated Use HeroDnaBackground */
export const HeroCircuitBackground = HeroDnaBackground
