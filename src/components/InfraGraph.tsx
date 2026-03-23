"use client";

import { useEffect, useRef } from "react";

interface ServiceNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  icon: string;
  group: string;
}

interface Connection {
  from: string;
  to: string;
  animated?: boolean;
}

const NODES: ServiceNode[] = [
  { id: "cf", label: "CloudFront", x: 0.08, y: 0.22, color: "hsl(280, 55%, 50%)", icon: "\u2601", group: "frontend" },
  { id: "s3", label: "S3 Bucket", x: 0.08, y: 0.45, color: "hsl(130, 50%, 40%)", icon: "\u25E7", group: "frontend" },
  { id: "amplify", label: "Amplify", x: 0.18, y: 0.33, color: "hsl(25, 85%, 55%)", icon: "\u26A1", group: "frontend" },
  { id: "apigw", label: "API Gateway", x: 0.08, y: 0.72, color: "hsl(280, 55%, 50%)", icon: "\u21CC", group: "api" },
  { id: "cognito", label: "Cognito", x: 0.08, y: 0.9, color: "hsl(0, 65%, 50%)", icon: "\uD83D\uDD11", group: "api" },
  { id: "lambda1", label: "Lambda", x: 0.22, y: 0.72, color: "hsl(25, 85%, 55%)", icon: "\u03BB", group: "api" },
  { id: "dynamo", label: "DynamoDB", x: 0.38, y: 0.55, color: "hsl(210, 60%, 50%)", icon: "\u229E", group: "backend" },
  { id: "lambda2", label: "Lambda", x: 0.52, y: 0.45, color: "hsl(25, 85%, 55%)", icon: "\u03BB", group: "backend" },
  { id: "sqs", label: "SQS", x: 0.38, y: 0.33, color: "hsl(280, 55%, 50%)", icon: "\u2261", group: "backend" },
  { id: "ecr", label: "ECR", x: 0.65, y: 0.18, color: "hsl(25, 85%, 55%)", icon: "\u25F3", group: "container" },
  { id: "ecs", label: "ECS", x: 0.72, y: 0.38, color: "hsl(25, 85%, 55%)", icon: "\u25A3", group: "compute" },
  { id: "fargate", label: "Fargate", x: 0.72, y: 0.58, color: "hsl(25, 85%, 55%)", icon: "\u25A4", group: "compute" },
  { id: "cloudwatch", label: "CloudWatch", x: 0.72, y: 0.78, color: "hsl(340, 60%, 50%)", icon: "\u25CE", group: "monitor" },
  { id: "elb", label: "Load Balancer", x: 0.9, y: 0.3, color: "hsl(280, 55%, 50%)", icon: "\u2295", group: "network" },
  { id: "rds", label: "RDS", x: 0.9, y: 0.55, color: "hsl(210, 60%, 50%)", icon: "\u22A1", group: "data" },
  { id: "elasticache", label: "ElastiCache", x: 0.9, y: 0.78, color: "hsl(210, 60%, 50%)", icon: "\u25C7", group: "data" },
];

const CONNECTIONS: Connection[] = [
  { from: "cf", to: "s3" },
  { from: "cf", to: "amplify" },
  { from: "s3", to: "amplify" },
  { from: "apigw", to: "lambda1", animated: true },
  { from: "cognito", to: "apigw" },
  { from: "lambda1", to: "dynamo", animated: true },
  { from: "dynamo", to: "lambda2" },
  { from: "sqs", to: "lambda2", animated: true },
  { from: "lambda2", to: "ecs", animated: true },
  { from: "ecr", to: "ecs" },
  { from: "ecs", to: "fargate" },
  { from: "fargate", to: "cloudwatch" },
  { from: "ecs", to: "elb", animated: true },
  { from: "elb", to: "rds" },
  { from: "elb", to: "elasticache" },
  { from: "cloudwatch", to: "elasticache" },
  { from: "lambda1", to: "sqs" },
];

const GROUPS = [
  { id: "frontend", label: "Frontend", x: 0.02, y: 0.12, w: 0.24, h: 0.32, color: "hsl(280, 40%, 60%)" },
  { id: "api", label: "API Layer", x: 0.02, y: 0.62, w: 0.28, h: 0.35, color: "hsl(0, 50%, 55%)" },
  { id: "backend", label: "Backend Engine", x: 0.3, y: 0.22, w: 0.3, h: 0.48, color: "hsl(25, 70%, 55%)" },
  { id: "compute", label: "Compute", x: 0.63, y: 0.08, w: 0.16, h: 0.78, color: "hsl(168, 40%, 40%)" },
  { id: "network", label: "Region Services", x: 0.82, y: 0.18, w: 0.16, h: 0.7, color: "hsl(210, 50%, 50%)" },
];

const InfraGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const getPos = (node: ServiceNode) => ({
      x: node.x * w,
      y: node.y * h,
    });

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      GROUPS.forEach((g) => {
        const gx = g.x * w;
        const gy = g.y * h;
        const gw = g.w * w;
        const gh = g.h * h;

        ctx.strokeStyle = g.color.replace(")", ", 0.25)").replace("hsl", "hsla");
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(gx, gy, gw, gh);
        ctx.setLineDash([]);

        ctx.fillStyle = g.color.replace(")", ", 0.04)").replace("hsl", "hsla");
        ctx.fillRect(gx, gy, gw, gh);

        ctx.font = "500 9px 'Inter', sans-serif";
        ctx.fillStyle = g.color.replace(")", ", 0.6)").replace("hsl", "hsla");
        ctx.fillText(g.label, gx + 6, gy + 12);
      });

      CONNECTIONS.forEach((conn) => {
        const fromNode = NODES.find((n) => n.id === conn.from);
        const toNode = NODES.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return;

        const from = getPos(fromNode);
        const to = getPos(toNode);

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = "hsla(220, 10%, 55%, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (conn.animated) {
          const t = ((time * 0.0004) % 1);
          const px = from.x + (to.x - from.x) * t;
          const py = from.y + (to.y - from.y) * t;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "hsl(168, 45%, 45%)";
          ctx.fill();

          const t2 = ((time * 0.0004 - 0.05 + 1) % 1);
          const px2 = from.x + (to.x - from.x) * t2;
          const py2 = from.y + (to.y - from.y) * t2;
          ctx.beginPath();
          ctx.arc(px2, py2, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "hsla(168, 45%, 45%, 0.4)";
          ctx.fill();
        }
      });

      NODES.forEach((node) => {
        const pos = getPos(node);
        const nodeSize = 16;

        ctx.fillStyle = node.color.replace(")", ", 0.08)").replace("hsl", "hsla");
        ctx.beginPath();
        const r = nodeSize + 4;
        ctx.roundRect(pos.x - r, pos.y - r, r * 2, r * 2, 6);
        ctx.fill();

        ctx.strokeStyle = node.color.replace(")", ", 0.3)").replace("hsl", "hsla");
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(pos.x - r, pos.y - r, r * 2, r * 2, 6);
        ctx.stroke();

        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = node.color;
        ctx.fillText(node.icon, pos.x, pos.y);

        ctx.font = "500 9px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "hsl(220, 10%, 50%)";
        ctx.fillText(node.label, pos.x, pos.y + nodeSize + 6);
      });

      ctx.font = "600 11px 'Inter', sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = "hsl(220, 15%, 35%)";
      ctx.fillText("Distributed Load Testing \u2014 AWS", 10, 8);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-xl border bg-[hsl(var(--surface-elevated))]"
      style={{ minHeight: 300 }}
    />
  );
};

export default InfraGraph;
