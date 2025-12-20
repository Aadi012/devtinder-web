import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-9999 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="
              px-5 py-3 rounded-xl shadow-lg
              text-white font-medium
              bg-linear-to-r 
              from-indigo-600 to-blue-500
              backdrop-blur-md
            "
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
