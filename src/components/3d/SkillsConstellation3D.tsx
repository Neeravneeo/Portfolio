import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SkillNodeData {
  name: string;
  category: 'Design' | 'Frontend' | 'Backend' | 'AI';
  x: number;
  y: number;
  z: number;
}

export const SkillsConstellation3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; category: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hasWebGL, setHasWebGL] = useState(true);

  const skills: SkillNodeData[] = [
    // Design & Systems (#f59e0b)
    { name: 'Design Systems', category: 'Design', x: -60, y: 30, z: 20 },
    { name: 'Figma Token Arch', category: 'Design', x: -80, y: 10, z: -10 },
    { name: 'Motion Design', category: 'Design', x: -50, y: 50, z: -25 },
    { name: 'Accessibility (WCAG)', category: 'Design', x: -70, y: -20, z: 30 },
    { name: 'Spatial UI / 3D', category: 'Design', x: -35, y: 25, z: 45 },

    // Frontend Architecture (#06b6d4)
    { name: 'React 19 & Next.js', category: 'Frontend', x: 20, y: 55, z: 15 },
    { name: 'TypeScript', category: 'Frontend', x: 45, y: 40, z: -20 },
    { name: 'Three.js & WebGL', category: 'Frontend', x: 0, y: 65, z: 30 },
    { name: 'Tailwind CSS v4', category: 'Frontend', x: 60, y: 20, z: 10 },
    { name: 'State Machines', category: 'Frontend', x: 30, y: 25, z: -40 },

    // Backend & Cloud (#8b5cf6)
    { name: 'Go (Golang)', category: 'Backend', x: 50, y: -30, z: 25 },
    { name: 'Node / Express', category: 'Backend', x: 75, y: -15, z: -15 },
    { name: 'Distributed Systems', category: 'Backend', x: 40, y: -50, z: 10 },
    { name: 'PostgreSQL / Supabase', category: 'Backend', x: 65, y: -40, z: -30 },
    { name: 'Docker & Edge Workers', category: 'Backend', x: 25, y: -60, z: 35 },

    // AI & Automation (#10b981)
    { name: 'LLM Orchestration', category: 'AI', x: -20, y: -45, z: 20 },
    { name: 'LangGraph & DAGs', category: 'AI', x: -45, y: -35, z: -25 },
    { name: 'Vector Databases', category: 'AI', x: -60, y: -50, z: 10 },
    { name: 'Autonomous Agents', category: 'AI', x: -30, y: -65, z: -15 },
    { name: 'Semantic Search', category: 'AI', x: 0, y: -40, z: -40 },
  ];

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
      console.warn('WebGL not available for skills constellation', e);
      setHasWebGL(false);
      return;
    }

    const width = canvas.parentElement?.clientWidth || 600;
    const height = 400;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.set(0, 0, 220);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0x111111, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 300);
    pointLight.position.set(0, 50, 100);
    scene.add(pointLight);

    const categoryColors = {
      Design: 0xf59e0b,
      Frontend: 0x06b6d4,
      Backend: 0x8b5cf6,
      AI: 0x10b981,
    };

    // Create Spheres for each skill node
    const sphereGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const meshes: { mesh: THREE.Mesh; data: SkillNodeData }[] = [];

    skills.forEach((skill) => {
      const color = categoryColors[skill.category];
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(skill.x, skill.y, skill.z);
      group.add(mesh);
      meshes.push({ mesh, data: skill });
    });

    // Create line connections between nodes in the same category or close neighbors
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const a = skills[i];
        const b = skills[j];
        const distSq =
          Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);

        // Connect if same category or nearby in 3D space
        if ((a.category === b.category && distSq < 3200) || distSq < 1600) {
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
          const colA = new THREE.Color(categoryColors[a.category]);
          const colB = new THREE.Color(categoryColors[b.category]);
          lineColors.push(colA.r, colA.g, colA.b, colB.r, colB.g, colB.b);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    // Mouse Interaction
    let targetRotationY = 0;
    let targetRotationX = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        targetRotationY += dx * 0.008;
        targetRotationX += dy * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        // Raycasting for node hover
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const intersects = raycaster.intersectObjects(meshes.map((m) => m.mesh));
        if (intersects.length > 0) {
          const hit = meshes.find((m) => m.mesh === intersects[0].object);
          if (hit) {
            setHoveredSkill({ name: hit.data.name, category: hit.data.category });
          }
        } else {
          setHoveredSkill(null);
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Visibility pause (Resilience Fix #3)
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

      if (!isDragging) {
        targetRotationY += 0.003;
      }

      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

      // Subtle float wave
      camera.position.y = Math.sin(time * 1.2) * 5;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const newWidth = canvas.parentElement.clientWidth;
      renderer.setSize(newWidth, 400);
      camera.aspect = newWidth / 400;
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

      sphereGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full rounded-2xl bg-[#111111] border border-[#222222] p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Header with category chips */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10">
        <div>
          <div className="text-xs font-mono tracking-widest text-[#f59e0b]">
            SPATIAL KNOWLEDGE GRAPH
          </div>
          <div className="text-lg font-medium text-[#fafafa] mt-0.5">
            Cross-Discipline Skills Constellation
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 text-[#f59e0b]">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Design
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#06b6d4]">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4]" /> Frontend
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#8b5cf6]">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" /> Backend
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#10b981]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" /> AI / Agents
          </span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-[380px] flex items-center justify-center my-2">
        {hasWebGL ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'none' }}
          />
        ) : (
          <div className="text-xs font-mono text-[#71717a]">
            3D Skills Graph Active
          </div>
        )}

        {/* Hover Tooltip Overlay */}
        {hoveredSkill && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#1a1a1a]/95 border border-[#333333] text-xs font-mono pointer-events-none shadow-xl transition-all">
            <span className="text-[#fafafa] font-semibold">{hoveredSkill.name}</span>
            <span className="text-[#71717a] ml-2">({hoveredSkill.category})</span>
          </div>
        )}

        {/* Interaction Hint */}
        <div className="absolute bottom-2 right-4 text-[10px] font-mono text-[#71717a] pointer-events-none">
          DRAG TO ORBIT • HOVER NODES
        </div>
      </div>
    </div>
  );
};
