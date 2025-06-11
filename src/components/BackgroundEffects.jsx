import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const BackgroundEffects = ({ children }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null);
  const mousePositionRef = useRef({ x: null, y: null });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const interactionRadius = 150;
  const mouseRadius = useRef(300);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
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

      particlesRef.current = Array.from({ length: particleCount }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 0.5 + 0.1;
        const angle = Math.random() * Math.PI * 2;

        return {
          x,
          y,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.3 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          baseSpeedX: Math.cos(angle) * speed,
          baseSpeedY: Math.sin(angle) * speed,
        };
      });
    };

    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      mouseRadius.current = 350;
      setTimeout(() => {
        mouseRadius.current = 300;
      }, 100);
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
            const forceX = Math.cos(angle) * force * 3;
            const forceY = Math.sin(angle) * force * 3;

            particle.speedX = forceX;
            particle.speedY = forceY;
          } else {
            particle.speedX += (particle.baseSpeedX - particle.speedX) * 0.05;
            particle.speedY += (particle.baseSpeedY - particle.speedY) * 0.05;
          }
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        const margin = particle.size;
        if (particle.x < margin) {
          particle.x = margin;
          particle.speedX *= -0.5;
          particle.baseSpeedX *= -1;
        } else if (particle.x > canvas.width - margin) {
          particle.x = canvas.width - margin;
          particle.speedX *= -0.5;
          particle.baseSpeedX *= -1;
        }

        if (particle.y < margin) {
          particle.y = margin;
          particle.speedY *= -0.5;
          particle.baseSpeedY *= -1;
        } else if (particle.y > canvas.height - margin) {
          particle.y = canvas.height - margin;
          particle.speedY *= -0.5;
          particle.baseSpeedY *= -1;
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const connectionDistance = 120;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `${p1.color}${Math.floor(opacity * 15)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

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
        className="fixed inset-0 pointer-events-none z-0 opacity-70"
      />

      <div className="w-full flex-1 flex flex-col items-center justify-start relative z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black/30 to-cyan-900/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-[clamp(20px,2.5vw,40px)] ${
                [
                  "bg-purple-700/25 top-1/4 left-1/4",
                  "bg-purple-500/25 top-3/4 right-1/4",
                  "bg-pink-500/25 bottom-1/4 left-1/3",
                  "bg-blue-500/20 top-1/3 right-1/5",
                ][i]
              }`}
              style={{
                width: [
                  "clamp(100px,12vw,200px)",
                  "clamp(120px,15vw,240px)",
                  "clamp(80px,10vw,160px)",
                  "clamp(60px,8vw,120px)",
                ][i],
                height: [
                  "clamp(100px,12vw,200px)",
                  "clamp(120px,15vw,240px)",
                  "clamp(80px,10vw,160px)",
                  "clamp(60px,8vw,120px)",
                ][i],
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0][i % 3],
                x: [0, 10, -10, 0][i % 4],
              }}
              transition={{
                duration: [6, 8, 7, 9][i],
                delay: [0, 2, 4, 1][i],
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background:
              mousePosition.x && mousePosition.y
                ? `radial-gradient(${mouseRadius.current}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(0, 217, 255, 0.3), 
                rgba(168, 85, 247, 0.2), 
                transparent 70%)`
                : "transparent",
          }}
          animate={{
            background:
              mousePosition.x && mousePosition.y
                ? `radial-gradient(${mouseRadius.current}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(0, 217, 255, 0.3), 
                rgba(168, 85, 247, 0.2), 
                transparent 70%)`
                : "transparent",
          }}
          transition={{
            background: { duration: 0.2, ease: "easeOut" },
            layout: { duration: 0.5 },
          }}
        />

        {children}
      </div>
    </div>
  );
};
