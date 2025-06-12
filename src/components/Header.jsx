import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header
      className="w-full hidden sm:flex"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <img
          src="/pechacks bgr.png"
          alt="PEC Hacks Logo"
          className="h-6 sm:h-8"
        />
      </div>
    </motion.header>
  );
};
