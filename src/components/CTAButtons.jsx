import { motion } from "framer-motion";
import { Calendar, Zap, Users } from "lucide-react";
import { GlowButton } from "./GlowButton";

export const CTAButtons = () => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mt-4 sm:mt-6 w-full px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.8 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto md:flex-nowrap">
        <GlowButton
          variant="primary"
          icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
          onClick={() => window.open("https://pechacks.org/", "_blank")}
          className="w-full sm:w-auto"
        >
          Visit 2.0
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
          className="w-full sm:w-auto"
        >
          Join our community
        </GlowButton>
      </div>

      <GlowButton
        variant="secondary"
        icon={<Zap className="w-4 h-4 sm:w-5 sm:h-5" />}
        onClick={() => console.log("Pre-register clicked")}
        className="w-full sm:w-auto"
      >
        Pre-register here
      </GlowButton>
    </motion.div>
  );
};
