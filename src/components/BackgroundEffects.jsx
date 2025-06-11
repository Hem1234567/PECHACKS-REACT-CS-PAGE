import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const BackgroundEffects = ({ children }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null);
  const mousePositionRef = useRef({ x: null, y: null });
  const interactionRadius = 150;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Properly handle retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initParticles();
    };

    const initParticles = () => {
      const colors = ["#00D4FF", "#8B5CF6", "#F472B6", "#10B981", "#F97316"];
      const particleCount = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 2000),
        200
      );

      // Ensure particles cover the entire canvas including edges
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.7 + 0.3, // Adjusted for better visibility
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        baseSpeedX: (Math.random() - 0.5) * 0.5,
        baseSpeedY: (Math.random() - 0.5) * 0.5,
      }));
    };

    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const updateParticles = () => {
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;

      particlesRef.current.forEach((particle) => {
        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const angle = Math.atan2(dy, dx);
            const forceX = Math.cos(angle) * force * 3; // Reduced force
            const forceY = Math.sin(angle) * force * 3;

            particle.speedX = forceX;
            particle.speedY = forceY;
          } else {
            // Smoother return to base speed
            particle.speedX += (particle.baseSpeedX - particle.speedX) * 0.05;
            particle.speedY += (particle.baseSpeedY - particle.speedY) * 0.05;
          }
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Softer boundary handling with margin
        const margin = particle.size * 2;
        if (particle.x < margin) {
          particle.x = margin;
          particle.speedX *= -0.8;
        } else if (particle.x > canvas.width - margin) {
          particle.x = canvas.width - margin;
          particle.speedX *= -0.8;
        }

        if (particle.y < margin) {
          particle.y = margin;
          particle.speedY *= -0.8;
        } else if (particle.y > canvas.height - margin) {
          particle.y = canvas.height - margin;
          particle.speedY *= -0.8;
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      const connectionDistance = 120;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `${p1.color}${Math.floor(opacity * 30)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles with proper blending
      particlesRef.current.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col items-center p-0">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-100" // Increased opacity
      />

      <div className="w-full flex-1 flex flex-col items-center justify-start relative z-10">
        {/* Reduced opacity of gradient overlay to not obscure particles */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black/30 to-cyan-900/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Rest of your content */}
        {children}
      </div>
    </div>
  );
};
