import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export const SocialLinks = () => {
  const socials = [
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
  ];

  return (
    <>
      <motion.div
        className="flex justify-center items-center gap-4 sm:gap-6 mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.0 }}
      >
        {socials.map(({ Icon, color, url }, index) => (
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
        className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-cyan-400/30 bg-black/50 backdrop-blur-sm mt-5 mb-8"
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
    </>
  );
};
