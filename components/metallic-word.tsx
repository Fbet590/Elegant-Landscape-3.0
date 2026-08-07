"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, Center, Environment, Lightformer } from "@react-three/drei"
import * as THREE from "three"

const FONT_URL = "/fonts/gentilis_bold.typeface.json"

function Word() {
  const groupRef = useRef<THREE.Group>(null)
  const shearedRef = useRef(false)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      // Slow, premium oscillation so the chrome catches the light — not a spin.
      groupRef.current.rotation.y = Math.sin(t * 0.45) * 0.22
      groupRef.current.rotation.x = Math.sin(t * 0.32) * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={1}
          height={0.28}
          curveSegments={14}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.025}
          bevelOffset={0}
          bevelSegments={10}
          onUpdate={(self) => {
            // Bake an italic shear into the geometry once so it keeps the
            // elegant slanted character of the original word.
            if (!shearedRef.current) {
              const shear = new THREE.Matrix4().set(
                1, 0.24, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
              )
              self.geometry.applyMatrix4(shear)
              self.geometry.computeVertexNormals()
              shearedRef.current = true
            }
          }}
        >
          Elegantly.
          <meshPhysicalMaterial
            color="#4d7a2a"
            metalness={1}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            reflectivity={1}
            envMapIntensity={2}
          />
        </Text3D>
      </Center>
    </group>
  )
}

export function MetallicWord() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8.5], fov: 30 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <spotLight position={[6, 8, 6]} angle={0.4} penumbra={1} intensity={2.2} />
      <pointLight position={[-6, -2, 4]} intensity={1.2} color="#c9f0a0" />

      <Word />

      {/* Procedural studio reflections — bright chrome streaks, no network fetch. */}
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 3, 4]} scale={[10, 3, 1]} color="#ffffff" />
        <Lightformer intensity={2} position={[-4, 1, 2]} scale={[3, 6, 1]} color="#dff5c4" />
        <Lightformer intensity={2.2} position={[4, -1, 2]} scale={[3, 6, 1]} color="#a8d878" />
        <Lightformer intensity={1.4} position={[0, -3, 3]} scale={[10, 2, 1]} color="#2d5016" />
      </Environment>
    </Canvas>
  )
}
