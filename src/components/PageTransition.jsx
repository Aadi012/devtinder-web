import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}      // start slightly lower
      animate={{ opacity: 1, y: 0 }}       // fade + slide up
      exit={{ opacity: 0, y: -10 }}        // slide up slightly when leaving
      transition={{
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1]        // premium cubic easing
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
