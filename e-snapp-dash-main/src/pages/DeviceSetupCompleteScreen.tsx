import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const DeviceSetupCompleteScreen = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically navigate to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // Format time as HH:MM
  const getFormattedTime = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
  };

  return (
    <motion.div
      className="portrait-mode relative flex flex-col min-h-screen bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Status Bar */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium">{getFormattedTime()}</div>
        <div className="flex items-center space-x-1">
          <div className="w-6 h-3 bg-black rounded-sm flex items-center justify-end px-0.5">
            <div className="w-1 h-1.5 bg-white rounded-sm"></div>
          </div>
          <span className="text-xs">100</span>
        </div>
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/modern-house.jpg.svg" 
          alt="Modern House" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-6 py-4 flex flex-col items-center justify-center">
        <motion.div
          className="flex flex-col items-center justify-center space-y-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <motion.div
            className="text-green-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 0.2 
            }}
          >
            <CheckCircle size={80} strokeWidth={1.5} />
          </motion.div>
          
          <motion.div 
            className="space-y-3 max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-gray-900">Setup Complete!</h1>
            <p className="text-gray-600">
              Your Smart Energy Meter has been successfully connected to your account.
            </p>
          </motion.div>

          <motion.div
            className="text-sm text-gray-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            Redirecting to dashboard...
          </motion.div>
        </motion.div>
      </div>

      {/* Home indicator */}
      <div className="w-full flex justify-center pb-safe">
        <div className="w-1/3 h-1 bg-black bg-opacity-10 rounded-full mb-2" />
      </div>
    </motion.div>
  );
};