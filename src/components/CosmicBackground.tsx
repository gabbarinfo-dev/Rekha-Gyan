"use client";

import React, { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate cosmic stars
    const starCount = 120;
    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      color: string;
    }[] = [];

    const colors = ["#ffffff", "#d4af37", "#f3e098", "#a78bfa", "#93c5fd"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep galactic backdrop
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );
      gradient.addColorStop(0, "rgba(54, 22, 94, 0.28)");
      gradient.addColorStop(0.4, "rgba(23, 15, 56, 0.22)");
      gradient.addColorStop(0.8, "rgba(9, 8, 22, 0.18)");
      gradient.addColorStop(1, "rgba(5, 4, 10, 0.15)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Rotating celestial vortex aura
      angle += 0.001;
      const vortex = ctx.createRadialGradient(
        width * 0.5 + Math.sin(angle) * 40,
        height * 0.3 + Math.cos(angle) * 30,
        10,
        width * 0.5,
        height * 0.3,
        width * 0.45
      );
      vortex.addColorStop(0, "rgba(212, 175, 55, 0.09)");
      vortex.addColorStop(0.5, "rgba(112, 26, 117, 0.08)");
      vortex.addColorStop(1, "transparent");

      ctx.fillStyle = vortex;
      ctx.fillRect(0, 0, width, height);

      // Render pulsing stars
      stars.forEach((star) => {
        star.alpha += Math.sin(Date.now() * star.speed) * 0.01;
        const clampedAlpha = Math.max(0.15, Math.min(0.9, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha * 0.75;
        ctx.shadowBlur = 6;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.closePath();
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
      {/* Mystical soft vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(147,51,234,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.06),transparent_50%)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}
