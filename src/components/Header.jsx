
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header
      className="w-full px-4  hidden sm:flex justify-start"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <img
        src="/pechacks bgr.png"
        alt="PEC Hacks Logo"
        className="h-6 sm:h-8"
      />
    </motion.header>
  );
};
