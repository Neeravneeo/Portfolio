import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AlzoShowcase3DProps {
  onOpenExperience: () => void;
}

export const AlzoShowcase3D: React.FC<AlzoShowcase3DProps> = ({ onOpenExperience }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeRole, setActiveRole] = useState<'Doctor' | 'Caregiver' | 'Patient'>('Doctor');
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not available for ALZO 3D showcase', e);
      setHasWebGL(false);
      return;
    }

    const width = canvas.parentElement?.clientWidth || 420;
    const height = 360;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 20, 260);

    // Subtle dark void lighting
    const ambientLight = new THREE.AmbientLight(0x111111, 2);
    scene.add(ambientLight);

    // 3 Primary Colored Point Lights matching orbs
    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 200);
    cyanLight.position.set(-60, 40, 50);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 3, 200);
    amberLight.position.set(60, 40, 50);
    scene.add(amberLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 200);
    purpleLight.position.set(0, -60, 50);
    scene.add(purpleLight);

    // The Ecosystem Group
    const ecosystemGroup = new THREE.Group();
    scene.add(ecosystemGroup);

    // Orb 1: Doctor (Cyan #06b6d4)
    const docGeo = new THREE.SphereGeometry(18, 32, 32);
    const docMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.7,
    });
    const docMesh = new THREE.Mesh(docGeo, docMat);
    docMesh.position.set(-65, 35, 0);
    ecosystemGroup.add(docMesh);

    // Doctor Wireframe halo
    const haloGeo = new THREE.TorusGeometry(26, 0.6, 16, 64);
    const docHaloMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
    const docHalo = new THREE.Mesh(haloGeo, docHaloMat);
    docHalo.rotation.x = Math.PI / 3;
    docMesh.add(docHalo);

    // Orb 2: Caregiver (Amber #f59e0b)
    const careGeo = new THREE.SphereGeometry(16, 32, 32);
    const careMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.7,
    });
    const careMesh = new THREE.Mesh(careGeo, careMat);
    careMesh.position.set(65, 35, 0);
    ecosystemGroup.add(careMesh);

    const careHaloMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 });
    const careHalo = new THREE.Mesh(haloGeo, careHaloMat);
    careHalo.rotation.y = Math.PI / 4;
    careMesh.add(careHalo);

    // Orb 3: Patient (Purple #8b5cf6)
    const patGeo = new THREE.SphereGeometry(17, 32, 32);
    const patMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.7,
    });
    const patMesh = new THREE.Mesh(patGeo, patMat);
    patMesh.position.set(0, -45, 10);
    ecosystemGroup.add(patMesh);

    const patHaloMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 });
    const patHalo = new THREE.Mesh(haloGeo, patHaloMat);
    patHalo.rotation.x = -Math.PI / 4;
    patMesh.add(patHalo);

    // Interconnecting glowing Catmull-Rom splines between Doctor, Caregiver, Patient
    const createSplineCurve = (start: THREE.Vector3, end: THREE.Vector3, color: number) => {
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0, 25)); // bow forward into 3D space
      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      const points = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineDashedMaterial({
        color,
        dashSize: 6,
        gapSize: 4,
        linewidth: 2,
      });
      const line = new THREE.Line(curveGeo, curveMat);
      line.computeLineDistances();
      return line;
    };

    const lineDocCare = createSplineCurve(docMesh.position, careMesh.position, 0x06b6d4);
    const lineCarePat = createSplineCurve(careMesh.position, patMesh.position, 0xf59e0b);
    const linePatDoc = createSplineCurve(patMesh.position, docMesh.position, 0x8b5cf6);

    ecosystemGroup.add(lineDocCare);
    ecosystemGroup.add(lineCarePat);
    ecosystemGroup.add(linePatDoc);

    // Floating UI node particles representing real-time telemetry packets
    const packetCount = 24;
    const packetGeo = new THREE.BufferGeometry();
    const packetPos = new Float32Array(packetCount * 3);
    for (let i = 0; i < packetCount; i++) {
      packetPos[i * 3] = (Math.random() - 0.5) * 140;
      packetPos[i * 3 + 1] = (Math.random() - 0.5) * 110;
      packetPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      transparent: true,
      opacity: 0.6,
    });
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    ecosystemGroup.add(packetPoints);

    // Mouse Interaction for 3D Camera Orbit
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isInteracting = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isInteracting = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isInteracting) {
        // Subtle tilt on hover
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = x * 0.4;
        targetRotationX = y * 0.2;
        return;
      }
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotationY += dx * 0.008;
      targetRotationX += dy * 0.008;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onMouseUp = () => {
      isInteracting = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resilience Fix #3: Visibility Guard
    let isVisible = !document.hidden;
    const handleVis = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVis);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Idle auto-rotation
      if (!isInteracting) {
        targetRotationY += 0.002;
      }

      ecosystemGroup.rotation.y += (targetRotationY - ecosystemGroup.rotation.y) * 0.06;
      ecosystemGroup.rotation.x += (targetRotationX - ecosystemGroup.rotation.x) * 0.06;

      // Floating gentle oscillation
      docMesh.position.y = 35 + Math.sin(time * 2) * 4;
      careMesh.position.y = 35 + Math.cos(time * 2.2) * 4;
      patMesh.position.y = -45 + Math.sin(time * 1.8) * 4;

      docHalo.rotation.z = time * 0.5;
      careHalo.rotation.z = -time * 0.6;
      patHalo.rotation.z = time * 0.7;

      // Pulse line dashed offset
      const lineMat = lineDocCare.material as THREE.LineDashedMaterial;
      lineMat.dashSize = 5 + Math.sin(time * 4) * 2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newWidth = canvas.parentElement.clientWidth;
      renderer.setSize(newWidth, 360);
      camera.aspect = newWidth / 360;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVis);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      docGeo.dispose();
      docMat.dispose();
      careGeo.dispose();
      careMat.dispose();
      patGeo.dispose();
      patMat.dispose();
      haloGeo.dispose();
      docHaloMat.dispose();
      careHaloMat.dispose();
      patHaloMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] rounded-2xl bg-[#111111] border border-[#262626] p-4 flex flex-col justify-between overflow-hidden shadow-2xl group hover:border-[#f59e0b]/50 transition-colors">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-pulse" />
          <span className="text-[11px] font-mono text-[#a1a1aa] tracking-widest uppercase">
            ALZO SPATIAL 3-ROLE ECOSYSTEM
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#1c1c1c] text-[10px] font-mono text-[#10b981] border border-[#2a2a2a]">
          3D WEBGL ENGINE
        </span>
      </div>

      {/* Center 3D WebGL Canvas */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        {hasWebGL ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'none' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#71717a]">
            ALZO 3-Way Ecosystem
          </div>
        )}

        {/* Spatial Legend Nodes */}
        <div className="absolute top-2 left-3 flex flex-col gap-1.5 pointer-events-none">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#06b6d4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
            <span>DOCTOR CLINICAL TELEMETRY</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#f59e0b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span>CAREGIVER VITAL SYNC</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8b5cf6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            <span>PATIENT ACCESSIBLE SURFACE</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Tray */}
      <div className="flex items-center justify-between z-10 pt-2 border-t border-[#1e1e1e]">
        <div className="text-[10px] font-mono text-[#71717a]">
          DRAG TO ROTATE 3D ECOSYSTEM
        </div>

        <button
          onClick={onOpenExperience}
          className="px-4 py-1.5 rounded-full bg-[#fafafa] text-[#0a0a0a] text-xs font-mono font-medium hover:bg-[#f59e0b] hover:text-[#0a0a0a] transition-colors cursor-pointer"
        >
          INTERACTIVE SIMULATOR →
        </button>
      </div>
    </div>
  );
};
