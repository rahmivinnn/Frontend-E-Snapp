import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';

export const WiFiSuccessScreen = () => {
  const navigate = useNavigate();
  const [signalStrength, setSignalStrength] = useState(85);
  const [connectionSpeed, setConnectionSpeed] = useState(120);
  
  // Simulate changing signal strength
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev => {
        const newValue = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3);
        return Math.min(Math.max(newValue, 75), 95); // Keep between 75-95
      });
      
      setConnectionSpeed(prev => {
        const newValue = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5);
        return Math.min(Math.max(newValue, 100), 150); // Keep between 100-150 Mbps
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    // Navigate to device setup or device naming
    navigate('/device-naming');
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
            Wi-Fi Setup
          </motion.h1>
        </div>

        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-medium mb-1">WiFi Router 1</h2>
        </motion.div>

        {/* Success Icon and Connection Details */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="bg-teal-600 rounded-full p-4 mb-4"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Check size={32} className="text-white" />
          </motion.div>
          
          <motion.h3 
            className="text-xl font-medium text-center mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Connected successfully
          </motion.h3>
          
          {/* Connection Details Cards */}
          <motion.div 
            className="w-full grid grid-cols-2 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Signal Strength Card */}
            <motion.div 
              className="bg-blue-50 rounded-2xl p-4 shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2 flex items-center justify-center">
                  <Wifi size={16} className="mr-1" /> Signal Strength
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {signalStrength}%
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-teal-600 h-2 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${signalStrength}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Connection Speed Card */}
            <motion.div 
              className="bg-blue-50 rounded-2xl p-4 shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Connection Speed</div>
                <motion.div 
                  className="text-2xl font-bold text-foreground"
                  key={connectionSpeed} // Force animation on value change
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {connectionSpeed} <span className="text-lg text-muted-foreground">Mbps</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="mt-auto">
          <motion.button
            className="w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg flex items-center justify-center font-medium"
            onClick={handleContinue}
            whileHover={{ scale: 1.05, backgroundColor: "#0d9488" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <motion.span
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              Continue to Device Setup
            </motion.span>
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