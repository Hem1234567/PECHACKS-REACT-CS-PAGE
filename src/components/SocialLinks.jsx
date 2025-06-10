import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export const SocialLinks = () => {
  const socials = [
    {
      Icon: Twitter,
      color: "text-blue-400",
      borderColor: "border-blue-400/50",
      url: "https://x.com/PECHacks",
    },
    {
      Icon: Instagram,
      color: "text-pink-500",
      borderColor: "border-pink-500/50",
      url: "https://www.instagram.com/pechacks/",
    },
    {
      Icon: Linkedin,
      color: "text-blue-600",
      borderColor: "border-blue-600/50",
      url: "https://www.linkedin.com/company/pec-hacks/",
    },
    {
      Icon: Youtube,
      color: "text-red-500",
      borderColor: "border-red-500/50",
      url: "https://www.youtube.com/@TheCodingSociety",
    },
  ];

  return (
    <>
      <motion.div
        className="flex justify-center items-center gap-4 sm:gap-8 mt-6 sm:mt-7"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.0 }}
      >
        {socials.map(({ Icon, color, borderColor, url }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative group cursor-pointer"
            onClick={() => window.open(url, "_blank")}
          >
            <div
              className={`p-3 sm:p-3 border-2 ${borderColor} rounded-full ${color} hover:${borderColor.replace(
                "/50",
                "/70"
              )} transition-colors duration-300 cursor-pointer`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-2 rounded-full border-2 border-cyan-400/30 bg-black/50 backdrop-blur-sm mt-5 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse" />
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
        <span className="text-cyan-300 font-medium text-sm sm:text-sm md:text-base cursor-default">
          Stay tuned for updates
        </span>
      </motion.div>
    </>
  );
};
