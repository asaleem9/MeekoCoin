"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { gsap } from "@/lib/gsap";

type SceneProps = {
  /** 0→1 as the hero scrolls out; written by Hero's ScrollTrigger */
  exitRef: MutableRefObject<number>;
};

function MeekoCoin({ exitRef }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const spinSpeed = useRef(0.6);
  const clicks = useRef<number[]>([]);
  const logo = useTexture("/meeko-logo.png");
  logo.colorSpace = THREE.SRGBColorSpace;

  useEffect(() => {
    // Easter-egg hooks: DEGEN MODE hyperspin, idle sleep slowdown.
    const onDegen = (e: Event) => {
      const on = (e as CustomEvent).detail?.on;
      gsap.to(spinSpeed, { current: on ? 14 : 0.6, duration: 1.2, ease: "power3.inOut" });
    };
    const onSleep = () => gsap.to(spinSpeed, { current: 0.08, duration: 2 });
    const onWake = () => {
      gsap.fromTo(
        group.current!.scale,
        { x: 1.15, y: 0.85, z: 1.15 },
        { x: 1, y: 1, z: 1, duration: 0.8, ease: "elastic.out(1.4, 0.3)" }
      );
      gsap.to(spinSpeed, { current: 0.6, duration: 0.6 });
    };
    window.addEventListener("meeko:degen", onDegen);
    window.addEventListener("meeko:sleep", onSleep);
    window.addEventListener("meeko:wake", onWake);
    return () => {
      window.removeEventListener("meeko:degen", onDegen);
      window.removeEventListener("meeko:sleep", onSleep);
      window.removeEventListener("meeko:wake", onWake);
    };
  }, []);

  const onCoinClick = () => {
    const now = performance.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 4000), now];
    if (clicks.current.length >= 10) {
      clicks.current = [];
      // Dizzy: violent wobble, then stars (DOM overlay listens for the event).
      const g = group.current;
      if (g) {
        gsap
          .timeline()
          .to(g.rotation, { z: 0.45, duration: 0.1, ease: "power2.in" })
          .to(g.rotation, {
            z: 0,
            duration: 2.2,
            ease: "elastic.out(1.8, 0.15)",
          });
      }
      window.dispatchEvent(new CustomEvent("meeko:dizzy"));
    }
  };

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * spinSpeed.current;
    // Scroll exit: coin tips back and sinks as the hero leaves.
    const exit = exitRef.current;
    g.position.y = -exit * 3.2;
    g.rotation.x = exit * 1.1;
    // Subtle pointer parallax on the whole group.
    const px = state.pointer.x * 0.25;
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, px * 0.3, 0.05);
  });

  return (
    <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={group} onClick={onCoinClick}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.7, 1.7, 0.22, 72]} />
          {/* rim */}
          <meshStandardMaterial
            attach="material-0"
            metalness={1}
            roughness={0.12}
            color="#E8ECF3"
          />
          {/* faces */}
          <meshStandardMaterial
            attach="material-1"
            map={logo}
            metalness={0.75}
            roughness={0.3}
            color="#FFFFFF"
          />
          <meshStandardMaterial
            attach="material-2"
            map={logo}
            metalness={0.75}
            roughness={0.3}
            color="#FFFFFF"
          />
        </mesh>
        {/* thin holo ring floating around the coin */}
        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[2.4, 0.02, 12, 96]} />
          <meshStandardMaterial
            metalness={1}
            roughness={0.1}
            color="#C8FF00"
            emissive="#C8FF00"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Nebula() {
  return (
    <mesh position={[0, 0, -6]} scale={7}>
      <sphereGeometry args={[1, 48, 48]} />
      <MeshDistortMaterial
        color="#150A2E"
        emissive="#FF3DAE"
        emissiveIntensity={0.12}
        roughness={0.9}
        distort={0.45}
        speed={1.6}
      />
    </mesh>
  );
}

export default function HeroScene({ exitRef }: SceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  // Stop rendering entirely once the hero has scrolled away.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "20%",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 6], fov: 42 }}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 100 } }}
      >
        <ambientLight intensity={0.4} />
        <Nebula />
        <MeekoCoin exitRef={exitRef} />
        <Sparkles count={90} scale={[12, 8, 6]} size={2.2} speed={0.35} color="#C8FF00" />
        <Sparkles count={60} scale={[10, 7, 5]} size={1.6} speed={0.25} color="#4DF3FF" />
        <Environment resolution={256}>
          <Lightformer intensity={5} position={[0, 4, 2]} scale={[10, 8, 1]} color="#FFFFFF" />
          <Lightformer intensity={3} position={[-6, 0, 2]} scale={[8, 4, 1]} color="#4DF3FF" />
          <Lightformer intensity={3} position={[6, -1, 2]} scale={[8, 4, 1]} color="#FF3DAE" />
          <Lightformer intensity={2.5} position={[0, -5, 3]} scale={[12, 4, 1]} color="#C8FF00" />
        </Environment>
      </Canvas>
    </div>
  );
}
