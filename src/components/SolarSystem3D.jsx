import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const planets = [
  {
    name: "Mercury",
    color: "#a8a8a8",
    size: 0.22,
    distance: 2.3,
    speed: 0.9,
  },
  {
    name: "Venus",
    color: "#e8b66d",
    size: 0.34,
    distance: 3.3,
    speed: 0.65,
  },
  {
    name: "Earth",
    color: "#3b82f6",
    size: 0.38,
    distance: 4.5,
    speed: 0.48,
  },
  {
    name: "Mars",
    color: "#ef6548",
    size: 0.3,
    distance: 5.7,
    speed: 0.38,
  },
  {
    name: "Jupiter",
    color: "#d6a77a",
    size: 0.75,
    distance: 7.5,
    speed: 0.22,
  },
  {
    name: "Saturn",
    color: "#d9c18c",
    size: 0.63,
    distance: 9.4,
    speed: 0.17,
  },
  {
    name: "Uranus",
    color: "#82d8e8",
    size: 0.46,
    distance: 11,
    speed: 0.12,
  },
  {
    name: "Neptune",
    color: "#4169e1",
    size: 0.45,
    distance: 12.5,
    speed: 0.09,
  },
];

function Sun() {
  const sunRef = useRef();

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#ffcc55" />
      </mesh>

      <pointLight
        color="#ffd166"
        intensity={150}
        distance={45}
        decay={2}
      />

      <mesh>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial
          color="#ff9f1c"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

function OrbitPath({ distance }) {
  const points = [];

  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2;

    points.push(
      new THREE.Vector3(
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      )
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive
      object={new THREE.LineLoop(
        geometry,
        new THREE.LineBasicMaterial({
          color: "#64748b",
          transparent: true,
          opacity: 0.28,
        })
      )}
    />
  );
}

function Planet({ planet, onSelect, selected }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angleRef.current += delta * planet.speed;

    if (groupRef.current) {
      groupRef.current.position.x =
        Math.cos(angleRef.current) * planet.distance;

      groupRef.current.position.z =
        Math.sin(angleRef.current) * planet.distance;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      <OrbitPath distance={planet.distance} />

      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(planet);
          }}
        >
          <sphereGeometry args={[planet.size, 32, 32]} />

          <meshStandardMaterial
            color={planet.color}
            roughness={0.8}
            metalness={0.05}
            emissive={planet.color}
            emissiveIntensity={
              selected ? 0.45 : 0.04
            }
          />
        </mesh>

        {planet.name === "Saturn" && (
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <ringGeometry
              args={[
                planet.size * 1.3,
                planet.size * 2,
                64,
              ]}
            />
            <meshBasicMaterial
              color="#cbb68b"
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}
      </group>
    </>
  );
}

function SolarScene({ onSelect, selectedPlanet }) {
  return (
    <>
      <color attach="background" args={["#070b16"]} />

      <ambientLight intensity={0.5} />

      <Stars
        radius={80}
        depth={45}
        count={2500}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />

      <Sun />

      {planets.map((planet) => (
        <Planet
          key={planet.name}
          planet={planet}
          onSelect={onSelect}
          selected={selectedPlanet?.name === planet.name}
        />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        minDistance={4}
        maxDistance={30}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function SolarSystem3D() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070b16]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
            Interactive experience
          </p>

          <h3 className="mt-1 text-lg font-bold text-white">
            Solar System Explorer
          </h3>
        </div>

        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
          ● 3D Environment
        </span>
      </div>

      <div className="relative h-[420px] sm:h-[560px]">
        <Canvas
          camera={{
            position: [0, 15, 20],
            fov: 45,
          }}
          dpr={[1, 1.5]}
        >
          <SolarScene
            onSelect={setSelectedPlanet}
            selectedPlanet={selectedPlanet}
          />
        </Canvas>

        <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-xs text-slate-300 backdrop-blur">
          Drag to rotate · Scroll to zoom
        </div>

        {selectedPlanet && (
          <div className="absolute right-4 top-4 w-48 rounded-xl border border-white/10 bg-[#111827]/95 p-4 shadow-xl backdrop-blur">
            <button
              onClick={() => setSelectedPlanet(null)}
              className="float-right text-slate-400 hover:text-white"
              aria-label="Close planet information"
            >
              ✕
            </button>

            <div
              className="mb-3 h-3 w-3 rounded-full"
              style={{
                backgroundColor: selectedPlanet.color,
              }}
            />

            <h4 className="text-lg font-bold text-white">
              {selectedPlanet.name}
            </h4>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Approximate orbital distance in this visualization:
            </p>

            <p className="mt-2 text-sm font-semibold text-yellow-400">
              {selectedPlanet.distance} relative units
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-5 py-3 text-xs leading-6 text-slate-500">
        Educational visualization. Planet sizes, distances, and orbital
        speeds are simplified and are not shown to scale.
      </div>
    </div>
  );
}