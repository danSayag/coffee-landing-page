import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { COFFEE_ORIGIN_POINTS, type CoffeeOriginId } from './data'
import OriginMarker from './OriginMarker'

const RADIUS = 1.6
const DOT_RADIUS = RADIUS + 0.02
const MARKER_RADIUS = RADIUS + 0.05

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

/** Real-world landmass dots, reused from the site's flat-map dataset, projected onto the sphere. */
function LandDots() {
  const [positions, setPositions] = useState<Float32Array | null>(null)

  useEffect(() => {
    let disposed = false
    import('../../components/origins/land-dots.json').then((mod) => {
      if (disposed) return
      const raw = mod.default as number[]
      const count = raw.length / 2
      const arr = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const lat = raw[i * 2] / 100
        const lon = raw[i * 2 + 1] / 100
        const v = latLonToVector3(lat, lon, DOT_RADIUS)
        arr[i * 3] = v.x
        arr[i * 3 + 1] = v.y
        arr[i * 3 + 2] = v.z
      }
      setPositions(arr)
    })
    return () => {
      disposed = true
    }
  }, [])

  if (!positions) return null
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.017} color="#c89b5b" sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}

interface GlobeGroupProps {
  activeId: CoffeeOriginId
  countryLabels: Record<CoffeeOriginId, string>
  paused: boolean
}

function GlobeGroup({ activeId, countryLabels, paused }: GlobeGroupProps) {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)

  const targetQuat = useMemo(() => {
    const point = COFFEE_ORIGIN_POINTS.find((p) => p.id === activeId) ?? COFFEE_ORIGIN_POINTS[0]
    const v = latLonToVector3(point.lat, point.lon, 1).normalize()
    const facingCamera = new THREE.Vector3(0, 0, 1)
    return new THREE.Quaternion().setFromUnitVectors(v, facingCamera)
  }, [activeId])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group || paused) return
    // Smooth, non-jumpy rotation toward the active origin; scroll transitions always win
    // over any other motion, so there is no separate idle spin fighting this slerp.
    group.quaternion.slerp(targetQuat, Math.min(1, delta * 2.4))
  })

  return (
    <group ref={groupRef}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshBasicMaterial color="#efe8da" transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS - 0.01, 48, 48]} />
        <meshBasicMaterial color="#e4dac4" transparent opacity={0.3} wireframe />
      </mesh>
      <LandDots />
      {COFFEE_ORIGIN_POINTS.map((point) => {
        const v = latLonToVector3(point.lat, point.lon, MARKER_RADIUS)
        const active = point.id === activeId
        return (
          <Html
            key={point.id}
            position={v}
            center
            occlude={[sphereRef as RefObject<THREE.Object3D>]}
            zIndexRange={[10, 0]}
            distanceFactor={active ? 4.6 : 5.4}
          >
            <OriginMarker active={active} label={active ? countryLabels[point.id] : undefined} animate={!paused} />
          </Html>
        )
      })}
    </group>
  )
}

interface CoffeeGlobeProps {
  activeId: CoffeeOriginId
  countryLabels: Record<CoffeeOriginId, string>
  paused: boolean
  ariaLabel: string
}

function CoffeeGlobe({ activeId, countryLabels, paused, ariaLabel }: CoffeeGlobeProps) {
  return (
    <div role="img" aria-label={ariaLabel} className="h-full w-full">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={42} />
        <ambientLight intensity={1.2} />
        <GlobeGroup activeId={activeId} countryLabels={countryLabels} paused={paused} />
      </Canvas>
    </div>
  )
}

export default CoffeeGlobe
