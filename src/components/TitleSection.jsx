import { motion } from "framer-motion";

export const TitleSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="space-y-3 w-full px-4"
    >
      <div className="space-y-2 sm:space-y-1">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <h1 className="text-[clamp(3.1rem,7vw,6rem)] font-black relative leading-[1.1] cursor-default font-[Poppins]">
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
            <div className="absolute inset-0 text-[clamp(3rem,7vw,5rem)] font-black cursor-default">
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

            <div className="relative text-[clamp(3rem,7vw,5rem)] font-black cursor-default">
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

            {/* Spinner Circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[clamp(8rem,20vw,16rem)] h-[clamp(6rem,13vw,11rem)] border-2 border-cyan-400/30 rounded-full animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <div
                  className="absolute inset-[0.5rem] border border-purple-500/50 rounded-full animate-spin"
                  style={{
                    animationDuration: "6s",
                    animationDirection: "reverse",
                  }}
                >
                  <div
                    className="absolute inset-[0.5rem] border border-pink-500/30 rounded-full animate-spin"
                    style={{ animationDuration: "4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-[clamp(1.3rem,1.8vw,1.8rem)] font-light max-w-[90vw] md:max-w-3xl mx-auto leading-relaxed space-y-2 sm:space-y-2 font-[Poppins]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p className="cursor-default">
          <span className="text-gray-300 font-semibold">Tamil Nadu's </span>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold animate-gradient bg-[length:200%_200%]">
            Largest Hackathon
          </span>
        </p>
        <p>
          <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold text-4xl sm:text-5xl cursor-default animate-blink">
            Coming Soon
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};
