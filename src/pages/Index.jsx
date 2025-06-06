import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Users,
  Calendar,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }
        html {
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow-y: scroll;
        }
        body {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col items-center p-0">
        <style jsx>{`
          @keyframes blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
          .animate-blink {
            animation: blink 1.5s ease-in-out infinite;
          }
          @keyframes gridMove {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: clamp(30px, 3vw, 50px) clamp(30px, 3vw, 50px);
            }
          }
        `}</style>

        <div
          className="w-full flex-1 flex flex-col items-center justify-center p-4 relative"
          style={{ overflow: "auto" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />

          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "clamp(30px, 3vw, 50px) clamp(30px, 3vw, 50px)",
              animation: "gridMove 20s linear infinite",
            }}
          />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[clamp(100px,12vw,200px)] h-[clamp(100px,12vw,200px)] bg-cyan-500/20 rounded-full blur-[clamp(20px,2.5vw,40px)] animate-pulse" />
            <div
              className="absolute top-3/4 right-1/4 w-[clamp(120px,15vw,240px)] h-[clamp(120px,15vw,240px)] bg-purple-500/20 rounded-full blur-[clamp(20px,2.5vw,40px)] animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-[clamp(80px,10vw,160px)] h-[clamp(80px,10vw,160px)] bg-pink-500/20 rounded-full blur-[clamp(20px,2.5vw,40px)] animate-pulse"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div
            className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-300"
            style={{
              background: `radial-gradient(clamp(250px,30vw,600px) circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 217, 255, 0.3), rgba(168, 85, 247, 0.2), transparent 70%)`,
            }}
          />

          <header className="w-full sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-transparent">
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
              <a
                href="#"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img src="/pechacks bgr.png" alt="Logo" className="h-8" />
              </a>
            </nav>
          </header>

          <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center mt-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 w-full px-4"
            >
              <div className="space-y-4">
                <motion.div
                  className="relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                >
                  <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-black relative leading-[1.1] cursor-default">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent blur-sm animate-pulse">
                      PEC HACKS
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                      PEC HACKS
                    </span>
                    <span className="relative bg-gradient-to-r from-white via-cyan-200 via-purple-200 via-pink-200 to-white bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                      PEC HACKS
                    </span>
                  </h1>
                </motion.div>

                <motion.div
                  className="relative flex justify-center"
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 text-[clamp(2.5rem,7vw,6rem)] font-black cursor-default">
                      <span className="absolute inset-0 text-cyan-400 blur-[clamp(8px,1vw,16px)] animate-pulse transform -translate-x-2 -translate-y-2">
                        3.0
                      </span>
                      <span
                        className="absolute inset-0 text-purple-500 blur-[clamp(5px,0.6vw,10px)] animate-pulse transform translate-x-1 translate-y-1"
                        style={{ animationDelay: "1s" }}
                      >
                        3.0
                      </span>
                      <span
                        className="absolute inset-0 text-pink-500 blur-[clamp(3px,0.4vw,6px)] animate-pulse transform translate-x-2 -translate-y-1"
                        style={{ animationDelay: "2s" }}
                      >
                        3.0
                      </span>
                    </div>

                    <div className="relative text-[clamp(2.5rem,7vw,6rem)] font-black cursor-default">
                      <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent transform translate-x-1 translate-y-1 opacity-60">
                        3.0
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-l from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent transform -translate-x-1 -translate-y-1">
                        3.0
                      </span>
                      <span className="relative bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                        3.0
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="text-[clamp(1rem,1.8vw,1.8rem)] font-light max-w-[90vw] md:max-w-3xl mx-auto leading-relaxed space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <p className="cursor-default">
                  <span className="text-gray-300 font-semibold">
                    Tamil Nadu's{" "}
                  </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold animate-gradient bg-[length:200%_200%]">
                    Largest Hackathon
                  </span>
                </p>
                <p>
                  <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold text-4xl sm:text-5xl cursor-default animate-blink">
                    Coming Soon
                  </span>
                </p>
                <p className="font-medium cursor-default">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium animate-gradient bg-[length:200%_200%]">
                    Hacking begins this December 2025...
                  </span>
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <GlowButton
                  variant="primary"
                  icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
                  onClick={() => window.open("https://pechacks.org/", "_blank")}
                >
                  Visit PEC Hacks 2.0
                </GlowButton>

                <GlowButton
                  variant="secondary"
                  icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5" />}
                  onClick={() => console.log("Pre-register clicked")}
                >
                  PRE REGISTER HERE
                </GlowButton>

                <GlowButton
                  variant="accent"
                  icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
                  onClick={() =>
                    window.open(
                      "https://chat.whatsapp.com/FtFHlapbGqPBxtZomqR5Km",
                      "_blank"
                    )
                  }
                >
                  Join Our Community
                </GlowButton>
              </motion.div>

              <motion.div
                className="flex justify-center items-center gap-4 sm:gap-6 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.0 }}
              >
                {[
                  {
                    Icon: Twitter,
                    color: "text-blue-400",
                    url: "https://x.com/PECHacks",
                  },
                  {
                    Icon: Instagram,
                    color: "text-pink-500",
                    url: "https://www.instagram.com/pechacks/",
                  },
                  {
                    Icon: Linkedin,
                    color: "text-blue-600",
                    url: "https://www.linkedin.com/company/pec-hacks/",
                  },
                  {
                    Icon: Youtube,
                    color: "text-red-500",
                    url: "https://www.youtube.com/@TheCodingSociety",
                  },
                ].map(({ Icon, color, url }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="relative group cursor-pointer"
                    onClick={() => window.open(url, "_blank")}
                  >
                    <div
                      className={`p-2 sm:p-3 border-2 border-white/20 rounded-full ${color} hover:border-white/50 transition-colors duration-300 cursor-pointer`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-cyan-400/30 bg-black/50 backdrop-blur-sm mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2.2 }}
              >
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <span className="text-cyan-300 font-medium text-xs sm:text-sm md:text-base cursor-default">
                  Stay tuned for epic updates
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const GlowButton = ({ children, variant, icon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    primary: {
      gradient: "from-cyan-400 to-blue-600",
      glow: "rgba(0, 217, 255, 0.4)",
      border: "border-cyan-400/50",
    },
    secondary: {
      gradient: "from-purple-400 to-pink-600",
      glow: "rgba(168, 85, 247, 0.4)",
      border: "border-purple-400/50",
    },
    accent: {
      gradient: "from-green-400 to-cyan-600",
      glow: "rgba(16, 185, 129, 0.4)",
      border: "border-green-400/50",
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group w-full sm:w-auto"
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${
          style.gradient
        } opacity-20 blur-xl transition-opacity duration-300 ${
          isHovered ? "opacity-40" : ""
        }`}
      />

      <button
        onClick={onClick}
        className={`
          relative w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-4
          text-sm sm:text-base font-semibold
          bg-black/50 backdrop-blur-sm
          border-2 ${style.border}
          hover:bg-black/70
          transition-all duration-300
          ${isHovered ? "text-white" : "text-gray-300"}
          rounded-2xl
          cursor-pointer
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 20px ${style.glow}, 0 0 40px ${style.glow}`
            : `0 0 10px ${style.glow}`,
        }}
      >
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
            style.gradient
          } opacity-0 transition-opacity duration-300 ${
            isHovered ? "opacity-10" : ""
          }`}
        />

        <div className="relative flex items-center justify-center gap-2 sm:gap-3">
          {icon && (
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {icon}
            </motion.div>
          )}
          <span>{children}</span>
        </div>
      </button>
    </motion.div>
  );
};

export default Index;
