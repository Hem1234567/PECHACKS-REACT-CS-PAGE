// components/GlowButton.jsx
import { motion } from "framer-motion";
import { useState } from "react";

export const GlowButton = ({ children, variant, icon, onClick }) => {
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
