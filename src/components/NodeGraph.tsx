"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  color: string;
}

const LABELS = [
  "Kubernetes", "Docker", "Terraform", "AWS", "GCP",
  "CI/CD", "GPT", "LLM", "Python", "Linux",
  "Ansible", "GitOps", "MLOps", "API",
];

const COLORS = [
  "hsl(168, 45%, 42%)",
  "hsl(168, 35%, 52%)",
  "hsl(220, 15%, 55%)",
  "hsl(40, 20%, 60%)",
];

const NodeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;

    nodesRef.current = LABELS.map((label) => ({
      x: Math.random() * (w() - 40) + 20,
      y: Math.random() * (h() - 40) + 20,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 4 + Math.random() * 4,
      label,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const CONNECTION_DIST = 150;

    const draw = () => {
      const width = w();
      const height = h();
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      nodes.forEach((node) => {
        if (mouseRef.current) {
          const dx = node.x - mouseRef.current.x;
          const dy = node.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100 * 0.5;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.995;
        node.vy *= 0.995;

        if (node.x < 20) { node.x = 20; node.vx *= -0.5; }
        if (node.x > width - 20) { node.x = width - 20; node.vx *= -0.5; }
        if (node.y < 20) { node.y = 20; node.vy *= -0.5; }
        if (node.y > height - 20) { node.y = height - 20; node.vy *= -0.5; }

        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.6) {
          node.vx = (node.vx / speed) * 0.6;
          node.vy = (node.vy / speed) * 0.6;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(168, 30%, 45%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = node.color.replace(")", ", 0.08)").replace("hsl", "hsla");
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        ctx.font = "500 10px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "hsl(220, 10%, 50%)";
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);
      });

      const time = Date.now() * 0.001;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST && (i + j) % 5 === Math.floor(time) % 5) {
            const t = (time * 0.5) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = "hsl(168, 45%, 42%)";
            ctx.fill();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleLeave = () => { mouseRef.current = null; };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ minHeight: 300 }}
    />
  );
};

export default NodeGraph;
