import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

export const DeviceConnectingScreen = () => {
  const navigate = useNavigate();
  const [hasDevice, setHasDevice] = useState(false);

  const handleAddDevice = () => {
    // Navigate to device naming screen
    navigate('/device-naming');
  };

  const handleBuyNow = () => {
    // Open external link to purchase device
    window.open('https://e-snapp.com/shop', '_blank');
  };

  const handleSkip = () => {
    // Skip device setup and go to home
    navigate('/home');
  };

  const handleBack = () => {
    navigate(-1);
  };

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
      <div className="relative z-10 flex-1 px-6 py-4 flex flex-col">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <motion.button
            className="p-2 -ml-2"
            onClick={handleBack}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <motion.h1 
            className="text-2xl font-bold ml-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Device Setup Wizard
          </motion.h1>
        </div>

        {/* Logo and Instructions */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* e-snapp Logo */}
          <motion.div
            className="w-32 h-32 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="/logo.svg" 
              alt="e-snapp Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          
          <motion.div 
            className="text-center space-y-2 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-teal-600">e-snapp</h2>
            <p className="text-gray-700">
              Connect to a device or buy device if you don't have the device
            </p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-auto">
          <motion.button
            className="w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg flex items-center justify-center font-medium"
            onClick={handleAddDevice}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Add Device
          </motion.button>
          
          <motion.button
            className="w-full border border-teal-600 text-teal-600 py-4 rounded-lg flex items-center justify-center font-medium"
            onClick={handleBuyNow}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Buy it now
          </motion.button>
          
          <motion.button
            className="w-full text-gray-500 py-3 rounded-lg flex items-center justify-center text-sm"
            onClick={handleSkip}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Skip for now
          </motion.button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="w-full flex justify-center pb-safe">
        <div className="w-1/3 h-1 bg-black bg-opacity-10 rounded-full mb-2" />
      </div>
    </motion.div>
  );
};