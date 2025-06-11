import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export const BackgroundEffects = ({ children }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameId = useRef(null);
  const mousePositionRef = useRef({ x: null, y: null });
  const interactionRadius = 150; // Radius around mouse that affects particles

  // Particle system initialization and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // Reinitialize particles on resize
    };

    // Initialize particles with movement properties
    const initParticles = () => {
      const colors = ["#00D4FF", "#8B5CF6", "#F472B6", "#10B981", "#F97316"];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);

      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2, // 2-5px
        opacity: Math.random() * 0.6 + 0.4, // 0.4-1.0
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        baseSpeedX: (Math.random() - 0.5) * 0.5, // Store base speed for returning to normal
        baseSpeedY: (Math.random() - 0.5) * 0.5,
      }));
    };

    // Handle mouse movement
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Update particle positions with mouse interaction
    const updateParticles = () => {
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;

      particlesRef.current.forEach((particle) => {
        // Only interact if mouse position is known
        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // If particle is within interaction radius
          if (distance < interactionRadius) {
            // Calculate force (stronger when closer to mouse)
            const force = (interactionRadius - distance) / interactionRadius;
            const angle = Math.atan2(dy, dx);

            // Apply repelling force
            const forceX = Math.cos(angle) * force * 5;
            const forceY = Math.sin(angle) * force * 5;

            particle.speedX = forceX;
            particle.speedY = forceY;
          } else {
            // Gradually return to base speed when outside interaction radius
            particle.speedX += (particle.baseSpeedX - particle.speedX) * 0.05;
            particle.speedY += (particle.baseSpeedY - particle.speedY) * 0.05;
          }
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
          particle.baseSpeedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
          particle.baseSpeedY *= -1;
        }

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });
    };

    // Draw all particles with connections
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 150) * 0.2;
            ctx.strokeStyle = p1.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate(); // Start animation loop

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col items-center p-0">
      {/* Interactive particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-70"
        style={{ background: "transparent" }}
      />

      <div className="w-full flex-1 flex flex-col items-center justify-start relative z-10">
        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Floating decorative blobs */}
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
