import { Canvas, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Scatter of points + least-squares line that "learns" its fit, with residuals shown as thin segments. */
function Fit({ runId, reduced, pointer }: { runId: number; reduced: boolean; pointer: { current: { x: number; y: number } } }) {
  const group = useRef<THREE.Group>(null!);
  const pts = useRef<THREE.InstancedMesh>(null!);
  const progress = useRef(reduced ? 1 : 0);

  const data = useMemo(() => {
    const r = rng(23);
    const N = 34;
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const x = (r() - 0.5) * 5;
      const y = 0.55 * x + (r() - 0.5) * 1.9;
      const z = (r() - 0.5) * 2.4;
      arr.push(new THREE.Vector3(x, y, z));
    }
    const mx = arr.reduce((s, p) => s + p.x, 0) / N;
    const my = arr.reduce((s, p) => s + p.y, 0) / N;
    let num = 0,
      den = 0;
    arr.forEach((p) => {
      num += (p.x - mx) * (p.y - my);
      den += (p.x - mx) ** 2;
    });
    const slope = num / den;
    return { arr, slope, intercept: my - slope * mx, my };
  }, []);

  const residGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(data.arr.length * 6), 3));
    return g;
  }, [data]);

  const gridGeo = useMemo(() => {
    const v: number[] = [];
    for (let i = -3.5; i <= 3.5; i += 0.5) {
      v.push(i, 0, -3.5, i, 0, 3.5, -3.5, 0, i, 3.5, 0, i);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
    return g;
  }, []);
  const boxGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(6, 5.2, 3)), []);

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    data.arr.forEach((p, i) => {
      m.setPosition(p);
      pts.current.setMatrixAt(i, m);
    });
    pts.current.instanceMatrix.needsUpdate = true;
  }, [data]);

  useLayoutEffect(() => {
    progress.current = reduced ? 1 : 0;
  }, [runId, reduced]);

  const write = (a: number, b: number) => {
    const rp = residGeo.attributes.position as THREE.BufferAttribute;
    data.arr.forEach((p, i) => {
      rp.setXYZ(i * 2, p.x, p.y, p.z);
      rp.setXYZ(i * 2 + 1, p.x, a * p.x + b, p.z);
    });
    rp.needsUpdate = true;
    const lp = lineGeo.attributes.position as THREE.BufferAttribute;
    lp.setXYZ(0, -3, a * -3 + b, 0);
    lp.setXYZ(1, 3, a * 3 + b, 0);
    lp.needsUpdate = true;
  };

  useLayoutEffect(() => {
    write(reduced ? data.slope : 0, reduced ? data.intercept : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, dt) => {
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + dt / 3.2);
      const e = 1 - Math.pow(1 - progress.current, 3);
      write(data.slope * e, data.intercept * e);
    }
    const t = state.clock.elapsedTime;
    const g = group.current;
    g.rotation.y += ((reduced ? 0 : Math.sin(t * 0.35) * 0.25) + pointer.current.x * 0.7 - g.rotation.y) * 0.05;
    g.rotation.x += (-0.12 - pointer.current.y * 0.3 - g.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      {/* axes */}
      <lineSegments geometry={gridGeo} position={[0, -2.6, 0]}>
        <lineBasicMaterial color="#11140f" transparent opacity={0.13} />
      </lineSegments>
      <lineSegments geometry={boxGeo}>
        <lineBasicMaterial color="#11140f" transparent opacity={0.16} />
      </lineSegments>
      <lineSegments geometry={residGeo} frustumCulled={false}>
        <lineBasicMaterial color="#11140f" transparent opacity={0.4} />
      </lineSegments>
      <instancedMesh frustumCulled={false} ref={pts} args={[undefined, undefined, data.arr.length]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshBasicMaterial color="#11140f" />
      </instancedMesh>
      {/* the fitted line */}
      <FitTube geo={lineGeo} />
    </group>
  );
}

/** A tube that follows the fitted line endpoints (cheap: 1 mesh, scaled/rotated every frame). */
function FitTube({ geo }: { geo: THREE.BufferGeometry }) {
  const ref = useRef<THREE.Mesh>(null!);
  const tmp = useMemo(() => ({ a: new THREE.Vector3(), b: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0) }), []);
  useFrame(() => {
    const p = geo.attributes.position as THREE.BufferAttribute;
    tmp.a.set(p.getX(0), p.getY(0), p.getZ(0));
    tmp.b.set(p.getX(1), p.getY(1), p.getZ(1));
    const len = tmp.a.distanceTo(tmp.b);
    ref.current.position.copy(tmp.a).add(tmp.b).multiplyScalar(0.5);
    ref.current.scale.set(1, len, 1);
    tmp.b.sub(tmp.a).normalize();
    ref.current.quaternion.setFromUnitVectors(tmp.up, tmp.b);
  });
  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.035, 0.035, 1, 8]} />
      <meshBasicMaterial color="#e4502b" />
    </mesh>
  );
}

export default function RegressionScene({
  runId,
  reduced,
  active,
  pointer,
}: {
  runId: number;
  reduced: boolean;
  active: boolean;
  pointer: { current: { x: number; y: number } };
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 9.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "demand"}
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <Fit runId={runId} reduced={reduced} pointer={pointer} />
    </Canvas>
  );
}
