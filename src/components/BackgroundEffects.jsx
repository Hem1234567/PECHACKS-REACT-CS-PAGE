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

      // Handle retina displays
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
        Math.floor((window.innerWidth * window.innerHeight) / 2500),
        200
      );

      // Create a grid for even distribution
      const cols = Math.ceil(Math.sqrt(particleCount));
      const rows = Math.ceil(particleCount / cols);
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Position in center of cell with slight randomness
        const x =
          col * cellWidth +
          cellWidth / 2 +
          (Math.random() * cellWidth * 0.4 - cellWidth * 0.2);
        const y =
          row * cellHeight +
          cellHeight / 2 +
          (Math.random() * cellHeight * 0.4 - cellHeight * 0.2);

        particlesRef.current.push({
          x,
          y,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.7 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          baseSpeedX: (Math.random() - 0.5) * 0.5,
          baseSpeedY: (Math.random() - 0.5) * 0.5,
        });
      }
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
        // Mouse interaction
        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const angle = Math.atan2(dy, dx);
            const forceX = Math.cos(angle) * force * 2;
            const forceY = Math.sin(angle) * force * 2;

            particle.speedX = forceX;
            particle.speedY = forceY;
          } else {
            // Return to normal movement
            particle.speedX += (particle.baseSpeedX - particle.speedX) * 0.05;
            particle.speedY += (particle.baseSpeedY - particle.speedY) * 0.05;
          }
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary handling with bounce
        const bounce = 0.8;
        const margin = particle.size * 2;

        if (particle.x < margin) {
          particle.x = margin;
          particle.speedX *= -bounce;
        } else if (particle.x > canvas.width - margin) {
          particle.x = canvas.width - margin;
          particle.speedX *= -bounce;
        }

        if (particle.y < margin) {
          particle.y = margin;
          particle.speedY *= -bounce;
        } else if (particle.y > canvas.height - margin) {
          particle.y = canvas.height - margin;
          particle.speedY *= -bounce;
        }

        // Random movement to prevent sticking
        if (Math.random() < 0.01) {
          particle.speedX += (Math.random() - 0.5) * 0.3;
          particle.speedY += (Math.random() - 0.5) * 0.3;
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (behind particles)
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

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
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
        className="fixed inset-0 pointer-events-none z-0 opacity-90"
      />

      <div className="w-full flex-1 flex flex-col items-center justify-start relative z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-[20px] ${
                [
                  "bg-purple-800/20",
                  "bg-purple-600/20",
                  "bg-pink-500/20",
                  "bg-blue-500/15",
                ][i]
              }`}
              style={{
                width: ["100px", "120px", "80px", "60px"][i],
                height: ["100px", "120px", "80px", "60px"][i],
                top: ["25%", "66%", "75%", "33%"][i],
                left: ["25%", "75%", "33%", "80%"][i],
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

        {children}
      </div>
    </div>
  );
};
