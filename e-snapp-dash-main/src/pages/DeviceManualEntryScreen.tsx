import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const DeviceManualEntryScreen = () => {
  const navigate = useNavigate();
  const [deviceCode, setDeviceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceCode.trim().length > 0) {
      // Simulate successful device connection
      navigate('/device-connecting');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSkip = () => {
    // Skip device setup and go to home
    navigate('/home');
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

        {/* Manual Entry Form */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div 
            className="text-center space-y-2 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-teal-600">Enter Device Code</h2>
            <p className="text-gray-700">
              Enter the 8-digit code found on the back of your Smart Energy Meter
            </p>
          </motion.div>

          <motion.form 
            className="w-full max-w-xs space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="space-y-2">
              <label htmlFor="deviceCode" className="block text-sm font-medium text-gray-700">
                Device Code
              </label>
              <input
                type="text"
                id="deviceCode"
                value={deviceCode}
                onChange={(e) => setDeviceCode(e.target.value)}
                placeholder="Enter 8-digit code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                maxLength={8}
                pattern="[0-9A-Za-z]{8}"
                required
              />
              <p className="text-xs text-gray-500">
                The code consists of 8 alphanumeric characters
              </p>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-teal-600 text-white py-4 rounded-lg shadow-lg flex items-center justify-center font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Connect Device
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Skip Button */}
        <motion.button
          className="w-full text-gray-500 py-3 rounded-lg flex items-center justify-center text-sm mt-auto"
          onClick={handleSkip}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          Skip for now
        </motion.button>
      </div>

      {/* Home indicator */}
      <div className="w-full flex justify-center pb-safe">
        <div className="w-1/3 h-1 bg-black bg-opacity-10 rounded-full mb-2" />
      </div>
    </motion.div>
  );
};