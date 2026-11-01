import { Canvas, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type Pointer = MutableRefObject<{ x: number; y: number }>;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** A neural-network lattice: nodes on a shell, linked to their nearest neighbours. */
function Network({ pointer, reduced }: { pointer: Pointer; reduced: boolean }) {
  const tilt = useRef<THREE.Group>(null!);
  const spin = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.InstancedMesh>(null!);

  const { nodes, lines } = useMemo(() => {
    const rand = rng(11);
    const N = 74;
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const rad = 2.75 + (rand() - 0.5) * 0.55;
      pts.push(new THREE.Vector3(Math.cos(th) * r * rad, y * rad, Math.sin(th) * r * rad));
    }
    const seg: number[] = [];
    pts.forEach((p, i) => {
      const near = pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((o) => o.j > i && o.d < 1.55)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      near.forEach(({ j }) => seg.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z));
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    return { nodes: pts, lines: geo };
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    nodes.forEach((p, i) => {
      const s = i % 9 === 0 ? 1.7 : 1;
      m.compose(p, new THREE.Quaternion(), new THREE.Vector3(s, s, s));
      mesh.current.setMatrixAt(i, m);
      c.set(i % 9 === 0 ? "#e4502b" : "#eee9dd");
      mesh.current.setColorAt(i, c);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [nodes]);

  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.001, dt);
    tilt.current.rotation.x += (pointer.current.y * 0.45 - tilt.current.rotation.x) * k * 0.6;
    tilt.current.rotation.y += (pointer.current.x * 0.6 - tilt.current.rotation.y) * k * 0.6;
    if (!reduced) spin.current.rotation.y += dt * 0.09;
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color="#9db59a" transparent opacity={0.32} />
        </lineSegments>
        <instancedMesh frustumCulled={false} ref={mesh} args={[undefined, undefined, nodes.length]}>
          <sphereGeometry args={[0.052, 10, 10]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
      </group>
    </group>
  );
}

/** Orbit rings with a single satellite each — a nod to model training loops. */
function Orbit({
  radius,
  tiltX,
  tiltZ,
  speed,
  pointer,
  reduced,
  color,
}: {
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  pointer: Pointer;
  reduced: boolean;
  color: string;
}) {
  const outer = useRef<THREE.Group>(null!);
  const sat = useRef<THREE.Mesh>(null!);
  const t = useRef(Math.random() * 6);
  useFrame((_, dt) => {
    if (!reduced) t.current += dt * speed;
    sat.current.position.set(Math.cos(t.current) * radius, 0, Math.sin(t.current) * radius);
    outer.current.rotation.x += (tiltX + pointer.current.y * 0.25 - outer.current.rotation.x) * 0.05;
    outer.current.rotation.z += (tiltZ + pointer.current.x * 0.25 - outer.current.rotation.z) * 0.05;
  });
  return (
    <group ref={outer} rotation={[tiltX, 0, tiltZ]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.006, 6, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      <mesh ref={sat}>
        <sphereGeometry args={[0.095, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function HeroScene({
  pointer,
  active,
  reduced,
}: {
  pointer: Pointer;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 10], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active && !reduced ? "always" : "demand"}
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <Network pointer={pointer} reduced={reduced} />
      <Orbit radius={3.15} tiltX={1.15} tiltZ={0.35} speed={0.45} pointer={pointer} reduced={reduced} color="#e4502b" />
      <Orbit radius={2.35} tiltX={0.55} tiltZ={-0.7} speed={-0.3} pointer={pointer} reduced={reduced} color="#c9a15a" />
      <Orbit radius={3.45} tiltX={-0.3} tiltZ={1.1} speed={0.22} pointer={pointer} reduced={reduced} color="#9db59a" />
    </Canvas>
  );
}
