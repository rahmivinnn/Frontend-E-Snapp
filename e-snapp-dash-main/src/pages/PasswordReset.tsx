import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

export const PasswordReset = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col bg-teal-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-4 pt-6 flex items-center">
        <motion.button
          onClick={() => navigate(-1)}
          className="text-white p-2"
          whileTap={{ scale: 0.95 }}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={24} />
        </motion.button>
        <motion.h1 
          className="text-xl font-bold text-white ml-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Password Reset
        </motion.h1>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 bg-white rounded-t-3xl p-5 flex flex-col items-center justify-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
        >
          <Check size={32} className="text-teal-600" />
        </motion.div>

        <motion.h2
          className="text-xl font-bold mb-2 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Password Reset Successfully
        </motion.h2>

        <motion.p
          className="text-gray-500 mb-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Your Password has been changed successfully
        </motion.p>

        <motion.button
          onClick={handleContinue}
          className="w-full py-4 bg-teal-600 text-white rounded-lg font-medium"
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Continue to Home
        </motion.button>

        {/* Illustration */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <img 
            src="/assets/password-reset-success.svg" 
            alt="Password Reset Success" 
            className="w-40 h-auto"
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Home indicator */}
        <div className="w-1/4 h-1 bg-black bg-opacity-30 rounded-full mx-auto mt-auto" />
      </motion.div>
    </motion.div>
  );
};

export default PasswordReset;