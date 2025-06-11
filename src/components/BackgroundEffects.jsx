import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export const BackgroundEffects = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const mouseRadius = useRef(250);
  const mouseTargetRadius = useRef(300);
  const lastUpdateTime = useRef(0);

  // Mouse position tracking with smooth transitions
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      // Expand radius on mouse movement
      mouseTargetRadius.current = 350;
      setTimeout(() => {
        mouseTargetRadius.current = 250;
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth radius animation
  useEffect(() => {
    const animateRadius = (timestamp) => {
      if (!lastUpdateTime.current) lastUpdateTime.current = timestamp;
      const deltaTime = timestamp - lastUpdateTime.current;
      lastUpdateTime.current = timestamp;

      const lerpFactor = Math.min(deltaTime * 0.005, 1);
      mouseRadius.current =
        mouseRadius.current +
        (mouseTargetRadius.current - mouseRadius.current) * lerpFactor;

      requestAnimationFrame(animateRadius);
    };
    requestAnimationFrame(animateRadius);
  }, []);

  // Enhanced particle effect with improved visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with debounce
    let resizeTimeout;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 100);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system with physics
    const particles = [];
    const colors = ["#00D4FF", "#8B5CF6", "#F472B6", "#10B981", "#F97316"];
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);

    // Create more visible particles
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const isCenterParticle = i % 5 === 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        particles.push({
          x: isCenterParticle
            ? centerX + (Math.random() - 0.5) * 200
            : Math.random() * canvas.width,
          y: isCenterParticle
            ? centerY + (Math.random() - 0.5) * 200
            : Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 4 + 2, // Larger particles (2-6px)
          opacity: 0,
          targetOpacity: Math.random() * 0.8 + 0.4, // Higher opacity (0.4-1.2)
          color: colors[Math.floor(Math.random() * colors.length)],
          isCenterParticle,
        });
      }, i * 30);
    }

    // Animation loop with optimized rendering
    let animationId;
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse attraction effect
      const mouseAttraction = 0.0001;
      const mouseRepulsion = 0.0003;
      const mouseRepulsionRadius = 100;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach((particle) => {
        // Smooth opacity transition
        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.05;

        // Center attraction for center particles
        if (particle.isCenterParticle) {
          const dx = centerX - particle.x;
          const dy = centerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const centerForce = 0.0002 * distance;
          particle.vx += dx * centerForce;
          particle.vy += dy * centerForce;
        }

        // Mouse interaction physics
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius.current) {
          const force = mouseAttraction * (1 - distance / mouseRadius.current);
          particle.vx += dx * force;
          particle.vy += dy * force;
        } else if (distance < mouseRepulsionRadius) {
          const force = mouseRepulsion * (1 - distance / mouseRepulsionRadius);
          particle.vx -= dx * force;
          particle.vy -= dy * force;
        }

        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle with enhanced glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 25 * particle.opacity; // Stronger glow (increased from 15)
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw more visible connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.save();
            const alpha =
              ((150 - distance) / 150) *
              0.3 * // Stronger connections (increased from 0.2)
              Math.min(p1.opacity, p2.opacity);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = p1.color;
            ctx.lineWidth = 3; // Thicker connection lines (increased from 2)
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = setTimeout(() => {
      animate(0);
    }, 300);

    return () => {
      clearTimeout(startAnimation);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col items-center p-0">
      {/* Enhanced Particle Canvas Background with higher opacity */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-1000"
        style={{ background: "transparent" }}
      />

      <div className="w-full flex-1 flex flex-col items-center justify-start relative z-10">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Floating blobs with enhanced animations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-[clamp(20px,2.5vw,40px)] ${
                [
                  "bg-purple-800/25 top-1/4 left-1/4",
                  "bg-purple-600/25 top-2/3 right-1/4",
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

        {/* First Dynamic mouse follow effect */}
        <motion.div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background: `radial-gradient(${mouseRadius.current}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 217, 255, 0.5),
              rgba(168, 85, 247, 0.4),
              transparent 70%)`,
          }}
          transition={{
            background: { duration: 0.2, ease: "easeOut" },
            layout: { duration: 0.5 },
          }}
        />

        {/* Second Dynamic mouse follow effect */}
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(${mouseRadius.current}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 217, 255, 0.4),
              rgba(168, 85, 247, 0.3),
              transparent 70%)`,
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
